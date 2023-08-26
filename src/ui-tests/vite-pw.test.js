// Run server before running tests
import { render, fireEvent, screen } from "@testing-library/svelte";
import loginPage, { handleLogin, handleSignUp } from "../routes/login/+page.svelte"
import { expect, test } from "@playwright/test";
import { chromium } from 'playwright';

describe("Playwright login test suite", async () => {
    let browser, page;

    beforeAll(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("http://localhost:5173/");
    })

    afterAll(async () => {
        await browser.close();
    })

    it("Should get page", async function() {
        expect(page).not.toBeNull();
    })

    it("Should show login page", async function () {
        const title = await page.getByText("Bank App", {exact: true}).innerText();
        const loginText = await page.getByText("Login here", {exact: true})
        expect(title).toBe("Bank App");
    })

})

