import { describe, expect, it } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/svelte";
import SignupPage from "../routes/signup/+page.svelte";
import { goto } from "$app/navigation";
import { chromium } from 'playwright';

describe("Playwright signup test suite", async () => {
    let browser, page;

    beforeEach(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await browser.close();
    },10000);

    test("Go to login page from signup page", async function () {
        await page.goto("http://localhost:5173/signup");
        const cancel = await page.getByText("Cancel")
        await cancel.click({delay: 300});
        await page.waitForEvent("framenavigated");
        const url = await page.url();
        expect(url).toContain("/login");
    });

    test("Create a new account with successful pop-up", async function () {
      // rmb to delete from database after running test case
      let message = null;
      await page.goto("http://localhost:5173/signup");
      
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
      await page.getByText("Create Account").click({delay: 300});
      await page.waitForEvent("dialog");
      
      expect(message).not.toBeNull();
      expect(message).toContain("Account created successfully!");

    });

});

describe("signup screen test suite", () => {

    let capturedAlertMessage = '';
    beforeEach(() => {
        window.alert = message => {
            capturedAlertMessage = message;
        }
    });
    
    afterEach(() => {
        capturedAlertMessage = '';
    });
test('should show alert for invalid first name format (contains numbers)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid first name. Please use letters only.');
});

test('should show error for invalid first name format (contains special characters)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid first name. Please use letters only.');
});

test('should show error for invalid first name format (contains numbers)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid first name. Please use letters only.');
});


test('should show error for invalid last name format (contains special characters)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid last name. Please use letters only.');
});

test('should show error for invalid last name format (contains numbers))', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid last name. Please use letters only.');
});

test('should show error for invalid last name format (contains numbers))', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe('Invalid last name. Please use letters only.');
});


test('should show error for invalid email format (missing @ and .com)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid email format. Please use the format 'example@example.com'.");
});

test('should show error for invalid email format (missing .com)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid email format. Please use the format 'example@example.com'.");
});

test('should show error for invalid email format (missing @)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid email format. Please use the format 'example@example.com'.");
});

test('should show error for invalid contact format (digits more than 8)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid contact format (digits less than 8)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid contact format (non-number digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid contact format (non-number digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid phone number. Please enter exactly 8 digits.");
});

test('should show error for invalid password format (for less than 5 digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid password. Please enter exactly 5 digits.");
});

test('should show error for invalid password format (for more than 5 digits)', async () => {
  // Reset the capturedAlertMessage before each test
    
  const { getByTestId, getByText } = render(SignupPage);
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
  await fireEvent.click(getByText('Create Account'));
  let alertMessage = capturedAlertMessage;
  expect(alertMessage).toBe("Invalid password. Please enter exactly 5 digits.");
});


// test('No error all right test cases', async () => {
//   // Reset the capturedAlertMessage before each test
    
//   const { getByTestId, getByText } = render(SignupPage);
//   const firstnameInput = getByTestId('First name');
//   await fireEvent.input(firstnameInput, { target: { value: 'user' } });
//   const lastnameInput = getByTestId('Last name');
//   await fireEvent.input(lastnameInput, { target: { value: 'user' } });
//   const emailInput = getByTestId('Email');
//   await fireEvent.input(emailInput, { target: { value: 'user@gmail.com' } });
//   const contactInput = getByTestId('Contact');
//   await fireEvent.input(contactInput, { target: { value: '12345678' } });
//   const passwordInput = getByTestId('Password');
//   await fireEvent.input(passwordInput, { target: { value:'12345' } });
//   await fireEvent.click(getByText('Create Account'));
//   let alertMessage = capturedAlertMessage;
//   expect(alertMessage).toBe("Account created successfully.");
// });

//     test('All correct test cases', async () => {
//   // Mock window.alert to capture the message
//   let capturedAlertMessage = '';
//   window.alert = message => {
//     capturedAlertMessage = message;
//   };

//   const { getByTestId, getByText } = render(SignupPage);
//   const firstnameInput = getByTestId('First name');
//   const lastnameInput = getByTestId('Last name');
//   const emailInput = getByTestId('Email');
//   const contactInput = getByTestId('Contact');
//   const passwordInput = getByTestId('Password');

//   // Input correct values
//   await fireEvent.input(firstnameInput, { target: { value: 'John' } });
//   await fireEvent.input(lastnameInput, { target: { value: 'Doe' } });
//   await fireEvent.input(emailInput, { target: { value: 'johndoe@example.com' } });
//   await fireEvent.input(contactInput, { target: { value: '12345678' } });
//   await fireEvent.input(passwordInput, { target: { value:'12345' } });

//   // Click the "Create Account" button
//   await fireEvent.click(getByText('Create Account'));

//   // Check if the alert message shows "Account created successfully!"
//   expect(capturedAlertMessage).toBe('Account created successfully!');
// });

// test('clicking cancel button navigates to correct place', async () => {
//     // Render the Signup component
//     const { getByText } = render(SignupPage);

//     // Find the "Cancel" button and click it
//     const cancelButton = getByText('Cancel');
//     fireEvent.click(cancelButton);

//     // Wait for the navigation to complete (replace '../login' with the correct expected route)
//     await waitFor(() => {
//       expect(window.location.pathname).toBe('/login');
//     });
//   });
    // it("should pass without error for valid last name format (contains all alphabets)", async () => {
    // render(SignupPage);
    // const lastnameInput3 = screen.getByPlaceholderText("Last name");
    // const errorMessage = screen.queryByTestId("lastname-error");
    // // console.log(errorMessage);
    // fireEvent.input(lastnameInput3, { target: { value: "testuser" } });
    // await new Promise((resolve) => setTimeout(resolve, 100));
    // expect(errorMessage).toBeDefined();
    // });





//     it("should redirect to login page when the cancel button is clicked", async () => {
//     // Render the signup page
//     render(SignupPage);

//     // Find the cancel button and click it
//     const cancelButton = screen.getByText("Cancel");
//     fireEvent.click(cancelButton);

//     // Assert that the goto function was called with the expected path
//     expect(goto).toHaveBeenCalledWith("../login");
//   });

});
