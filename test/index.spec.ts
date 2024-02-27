import { afterAll, beforeAll, describe, test } from "vitest";
import { preview, PreviewServer } from "vite";
import { Browser, BrowserContext, chromium, expect, Page, Locator } from "@playwright/test";
import type { ProgressEvent, ErrorEvent, DoneEvent } from "../src/types";

const PORT = 4173;

describe("imachi", async () => {
  let server: PreviewServer;
  let browser: Browser;
  let context: BrowserContext;

  beforeAll(async () => {
    server = await preview({ preview: { port: PORT } });
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  async function handleConsoleOutput(
    page: Page,
    consoleOutput: string[] | DoneEvent[] | ProgressEvent[] | ErrorEvent[],
  ) {
    page.on("console", async (msg) => {
      for (const arg of msg.args()) consoleOutput.push(await arg.jsonValue());
      console.log(...consoleOutput);
    });
  }

  async function setupProgressPage(
    pagePath: string,
  ): Promise<{ page: Page; consoleOutput: ProgressEvent[]; img: Locator }> {
    const page: Page = await context.newPage();
    const consoleOutput: ProgressEvent[] = [];

    await handleConsoleOutput(page, consoleOutput);
    await page.goto(`http://localhost:${PORT}/test/${pagePath}`);

    const img = page.locator(".image");

    return { page, consoleOutput, img };
  }

  async function setupDonePage(pagePath: string): Promise<{ page: Page; consoleOutput: DoneEvent[]; img: Locator }> {
    const page: Page = await context.newPage();
    const consoleOutput: DoneEvent[] = [];

    await handleConsoleOutput(page, consoleOutput);
    await page.goto(`http://localhost:${PORT}/test/${pagePath}`);

    const img = page.locator(".image");

    return { page, consoleOutput, img };
  }

  async function setupErrorPage(pagePath: string): Promise<{ page: Page; consoleOutput: ErrorEvent[]; img: Locator }> {
    const page: Page = await context.newPage();
    const consoleOutput: ErrorEvent[] = [];

    await handleConsoleOutput(page, consoleOutput);
    await page.goto(`http://localhost:${PORT}/test/${pagePath}`);

    const img = page.locator(".image");

    return { page, consoleOutput, img };
  }

  describe(".done()", async () => {
    test("event.images", async () => {
      const { page, consoleOutput, img } = await setupDonePage("fixtures/done.html");
      await img.waitFor({ state: "attached" });
      await page.waitForTimeout(50);
      const images = await page.evaluate(() => [...document.querySelectorAll(".image")]);

      expect(consoleOutput[0]).toHaveProperty("images");
      expect(consoleOutput[0].images).toHaveLength(images.length);
    });

    test("event.total", async () => {
      const { page, consoleOutput, img } = await setupDonePage("fixtures/done.html");

      await img.waitFor({ state: "attached" });
      await page.waitForTimeout(50);

      const images = await page.evaluate(() => [...document.querySelectorAll(".image")]);

      expect(consoleOutput[0]).toHaveProperty("total");
      expect(consoleOutput[0].total).toBe(images.length);
    });
  });

  describe(".progress()", async () => {
    test("event.src", async () => {
      const { page, consoleOutput, img } = await setupProgressPage("fixtures/progress.html");

      for (let i = 0; i < 5; i++) {
        await img.nth(i).waitFor({ state: "attached" });
        await page.waitForTimeout(50);
        expect(consoleOutput[0]).toHaveProperty("src");
        const imgSrc = await img.nth(i).getAttribute("src");
        expect(consoleOutput[0].src).toBe(imgSrc);
      }
    });

    test("event.element", async () => {
      const { page, consoleOutput, img } = await setupProgressPage("fixtures/progress.html");

      for (let i = 0; i < 5; i++) {
        await img.nth(i).waitFor({ state: "attached" });
        await page.waitForTimeout(50);
        expect(consoleOutput[0]).toHaveProperty("element");
        const imageElement = await page.evaluate(() => document.querySelector(".image"));
        expect(consoleOutput[0].element).toBe(imageElement);
      }
    });

    test("event.progress", async () => {
      const { page, consoleOutput, img } = await setupProgressPage("fixtures/progress.html");

      for (let i = 0; i < 5; i++) {
        await img.nth(i).waitFor({ state: "attached" });
        await page.waitForTimeout(50);
        expect(consoleOutput[0]).toHaveProperty("progress");
      }
    });

    test("event.progress.count", async () => {
      const { page, consoleOutput, img } = await setupProgressPage("fixtures/progress.html");

      for (let i = 0; i < 5; i++) {
        await img.nth(i).waitFor({ state: "attached" });
        await page.waitForTimeout(50);
        const progressCount = consoleOutput[i].progress.count;
        expect(progressCount).toBe(i + 1);
      }
    });

    test("event.progress.percentage", async () => {
      const { page, consoleOutput, img } = await setupProgressPage("fixtures/progress.html");

      for (let i = 0; i < 5; i++) {
        await img.nth(i).waitFor({ state: "attached" });
        await page.waitForTimeout(50);
        const progressPercentage = consoleOutput[i].progress.percentage;
        const progress = (i + 1) * 20;

        expect(progressPercentage).toBe(progress);
      }
    });

    test("event.progress.total", async () => {
      const { page, consoleOutput, img } = await setupProgressPage("fixtures/progress.html");

      await img.nth(1).waitFor({ state: "attached" });
      await page.waitForTimeout(50);

      const progressTotal = consoleOutput[0].progress.total;
      expect(progressTotal).toBe(consoleOutput.length);
    });
  });

  describe(".fail()", async () => {
    test("event.src", async () => {
      const { consoleOutput, img } = await setupErrorPage("fixtures/fail.html");
      await img.waitFor({ state: "attached" });

      expect(consoleOutput[0].src).toBe("./null.jpg");
    });

    test("event.imageElement", async () => {
      const { page, consoleOutput, img } = await setupErrorPage("fixtures/fail.html");
      await img.waitFor({ state: "attached" });
      const imageElement = await page.evaluate(() => document.querySelector(".image"));

      expect(consoleOutput[0]).toHaveProperty("element");
      expect(consoleOutput[0].element).toBe(imageElement);
    });

    test("event.error", async () => {
      const { consoleOutput, img } = await setupErrorPage("fixtures/fail.html");
      await img.waitFor({ state: "attached" });
      expect(consoleOutput[0]).toHaveProperty("error");
    });
  });
});
