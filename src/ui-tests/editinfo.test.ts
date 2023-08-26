import { describe, expect, it } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/svelte";
import editinfo from "../routes/[user]/editinfo/+page.svelte";
import { chromium } from 'playwright';

describe("Playwright editinfo test suite", async () => {
    const dynamicUserId = "TXCX7J4UkU"; // Replace this with the actual user ID

    let browser, page;

    beforeEach(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await browser.close();
    });
    test("Go to info page from editinfo page", async function () {
        await page.goto(`http://localhost:5173/${dynamicUserId}/editinfo`);
        const cancel = await page.getByText("Cancel")
        await cancel.click({delay: 300});
        await page.waitForEvent("framenavigated");
        const url = await page.url();
        expect(url).toContain("/info");
    }, 100000);
    // test("Go to info page from editinfo page", async function () {
    //     await page.goto(`http://localhost:5173/${dynamicUserId}/editinfo`);
    //     await page.click('text="Cancel"');
    //     await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    //     const url = page.url();
    //     expect(url).toContain("/info");
    // }, 1000000);

    test("Update user info with successful pop-u", async function () {
      // rmb to delete from database after running test case
      let message = null;
      await page.goto(`http://localhost:5173/${dynamicUserId}/editinfo`);
      
      await page.getByTestId("First name").click({ delay: 300 });
      await page.fill('[data-testid="First name"]', "John");
      await page.fill('[data-testid="Last name"]', "Doe");
      await page.fill('[data-testid="Email"]', `johndoe${Math.floor(Math.random()*10000)}@example.com`);
      await page.fill('[data-testid="Contact"]', "12345678");
      await page.fill('[data-testid="Password"]', "12345");
      
      page.on('dialog', async dialog => {
        message = await dialog.message();
        console.log("event listener called")
        console.log(message)
        await dialog.dismiss(); // Close the alert
      }); 
      await page.getByText("Update User Info").click({delay: 300});
      await page.waitForEvent("dialog");
      
      expect(message).not.toBeNull();
      expect(message).toContain("Change successful!");

    });

});

describe("editinfo screen test suite", () => {
  const data = {
    users: [
      {
        email: "user@example.com",
        phone: "12345678",
        first_name: "John123",
        last_name: "Doe",
        password: "12345",
        notify_email: true,
        notify_phone: false,
        source_member_id: "some_id",
      },
    ],
  };

    let capturedAlertMessage = '';
    beforeEach(() => {
        window.alert = message => {
            capturedAlertMessage = message;
        }
    });
    
    afterEach(() => {
        capturedAlertMessage = '';
    });
test('should show alert for no inputs passed', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: '' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: '' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: '' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Please fill in all the fields.');
});

test('should show alert for invalid first name format (contains numbers)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user123' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid first name. Please use letters only.');
});

test('should show error for invalid first name format (contains special characters)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user@$' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid first name. Please use letters only.');
});

test('should show error for invalid first name format (contains numbers)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user123' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid first name. Please use letters only.');
});


test('should show error for invalid last name format (contains special characters)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user@' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid last name. Please use letters only.');
});

test('should show error for invalid last name format (contains numbers))', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user123' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid last name. Please use letters only.');
});

test('should show error for invalid last name format (contains numbers))', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user123' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid last name. Please use letters only.');
});


test('should show error for invalid email format (missing @ and .com)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'usergmail' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid email format. Please use the format 'example@example.com'.");
});

test('should show error for invalid email format (missing .com)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid email format. Please use the format 'example@example.com'.");
});

test('should show error for invalid email format (missing @)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'usergmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid email format. Please use the format 'example@example.com'.");
});

test('should show error for invalid contact format (digits more than 8)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '123456789' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid contact format (digits less than 8)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '1234567' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid contact format (non-number digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '1234567jj' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid contact format (non-number digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '1234567jj' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '12345' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid password format (for less than 5 digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '1234' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid password. Please enter exactly 5 digits.");
});

test('should show error for invalid password format (for more than 5 digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(editinfo ,{ data });
  const firstnameInput = getByTestId('First name');
  await fireEvent.input(firstnameInput, { target: { value: 'user' } });
  const lastnameInput = getByTestId('Last name');
  await fireEvent.input(lastnameInput, { target: { value: 'user' } });
  const emailInput = getByTestId('Email');
  await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
  const contactInput = getByTestId('Contact');
  await fireEvent.input(contactInput, { target: { value: '12345678' } });
  const passwordInput = getByTestId('Password');
  await fireEvent.input(passwordInput, { target: { value: '123456' } });
  await fireEvent.click(getByText('Update User Info'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid password. Please enter exactly 5 digits.");
});

// // test when cancel button is clicked it should redirect to the user page
// test('Cancel button navigates to the appropriate page', async () => {
//   // Mock the source_member_id and create a fake info object with it
//   const source_member_id = 'user123';
//   const info = { source_member_id };

//   // Render the component with the fake info data
//   const { getByTestId } = render(editinfo, { data: { users: [info] } });

//   // Find the Cancel button and click it
//   const cancelButton = getByTestId('Cancel');
//   fireEvent.click(cancelButton);

//   // Wait for the navigation to be completed
//   await new Promise((resolve) => setTimeout(resolve, 100));

//   // Assert that the current location has changed to the appropriate page
//   assert.equal(location.pathname, `/${info.source_member_id}/info/`);

// });
});
