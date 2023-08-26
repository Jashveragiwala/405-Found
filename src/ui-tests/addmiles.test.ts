import { render, fireEvent, screen , waitFor} from "@testing-library/svelte";
import { expect } from "@playwright/test";
import { chromium } from 'playwright';

describe("Add miles page test suite", async () => {
    let browser = null, page = null;
    let currentMiles = null;
    beforeEach(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("http://localhost:5173/OQU2q94AmC/addmiles");
    })

    afterEach(async () => {
        await browser.close();
    })

    it("Should load add miles page with valid user",  async() => {
        const title = await page.getByText("Add Miles", { exact: true }).innerText();
        expect(title).toBe("Add Miles");
    })

    it("Should have miles input box", async () => {
        const milesInput= await page.getByTestId("milesInput");
        expect(milesInput).toBeDefined();
    })

    it("Should display current miles", async () => {
        const miles = await page.getByTestId("newtotal").innerText();
        expect(miles).toBeDefined();
        currentMiles = miles;
        console.log(currentMiles)
    })

    it("New total should not change if invalid value is entered", async () => {
        const milesInput = await page.getByTestId('milesInput')
        await milesInput.click();
        await milesInput.fill("-1");
        const miles = await page.getByTestId("newtotal").innerText();
        expect(miles).toBe(currentMiles)
    })

    // it("New total should change if valid value is entered", async () => {
    //     const milesInput = await page.getByTestId('milesInput')
    //     await milesInput.click();
    //     await milesInput.fill("100");
    //     // await page.waitForEvent("frameattached")
    //     await page.screenshot({path: "screenshot1.png"})
    //     const miles = await page.getByTestId("newtotal").innerText();
    //     console.log(miles)
    //     expect(miles).not.toBe(currentMiles)
    // })

    // it("Should show error if invalid value is submitted", async () => {
    //     const milesInput = await page.getByTestId('milesInput')
    //     await milesInput.click();
    //     await milesInput.fill("-1");
    //     await page.getByText("Add", {exact: true}).click()
    //     // await page.waitForEvent("frameattached")
    //     await page.screenshot({path: "screenshot2.png"})
    //     const error = page.getByTestId("error").innerText()
    //     expect(error).not.toBeNull()
    // })
})