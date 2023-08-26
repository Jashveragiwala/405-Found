import { render, fireEvent, screen } from "@testing-library/svelte";
import loginPage, { handleLogin, handleSignUp } from "../routes/login/+page.svelte"
import { expect, test } from "vitest";
import { chromium } from 'playwright';

describe("Playwright login test suite", async () => {
    let browser, page;

    beforeEach(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
    })

    afterEach(async () => {
        await browser.close();
    })

    it("Go to login page", async function () {
        await page.goto("http://localhost:5173/4MgAgRmU6h/info");
        const title = await page.getByText("James Johnson", {exact: true}).innerText()
        console.log(title)
        expect(title).toBeDefined()
        await page.screenshot({path: 'screenshot.png'});
    })
})

