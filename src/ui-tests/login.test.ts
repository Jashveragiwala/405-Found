import { describe, expect, it } from "vitest";
import { render, fireEvent, screen } from "@testing-library/svelte";
import loginPage, { handleLogin, handleSignUp } from "../routes/login/+page.svelte"



describe("Login screen test suite", () => {
    // test case 1: login page rendered properly
    // test case 2: correct credentials entered and can login
    // test case 3: invalid email format (no @)
    // test case 4: invalid email format (no .com)
    // test case 5: invalid email format (no @ and .com))
    // test case 6: invalid email format (digits)
    // test case 7: invalid email format (special characters)
    // test case 8: invalid password format (alphabets)
    // test case 9: invalid password format (special characters)
    // test case 10: invalid password format (more than 5 digits)
    // test case 11: invalid password format (less than 5 digits)
    // test case 12: empty username
    // test case 13: empty password
    
    // let page = null;

    beforeEach(() => {
        render(loginPage);
        // page = render(loginPage);
    })
    
    it("Should render login page properly",async () => {
        // expect(loginPage).toBeDefined();

        const bankAppText = screen.getByText("Bank App");
        expect(bankAppText).toBeInTheDocument()

        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        const loginButton = screen.getByRole('button', { name: 'Login' });
        const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
        expect(loginButton).toBeInTheDocument();
        expect(signUpButton).toBeInTheDocument();
    })

    it("Correct credentials entered",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.input(usernameInput, { target: { value: 'richard@smith.com' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
    })

    it("Wrong email format, no @",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richardsmith.com' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("username-error");
        expect(errorMessage).toBeDefined();
       
    })

    
    it("Wrong email format, no .com",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richard@smith' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
        
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("username-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong email format, no @ and .com",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richardsmith' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("username-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong email format, contains digits",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: '23@34.com' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("username-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong email format, contains special characters",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'rich/rd@sm!th.com' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("username-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong password format, contains alphabets",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richard@smith.com' } });
        fireEvent.input(passwordInput, { target: { value: 'abcde' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("password-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong password format, contains special characters",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richard@smith.com' } });
        fireEvent.input(passwordInput, { target: { value: '!2$45' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("password-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong password format, more than 5 digits",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richard@smith.com' } });
        fireEvent.input(passwordInput, { target: { value: '12345678' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("password-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("Wrong password format, less than 5 digits",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richard@smith.com' } });
        fireEvent.input(passwordInput, { target: { value: '123' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByTestId("password-error");
        // const errorMessage = await screen.findByText('Login failed: Invalid credentials.');
        expect(errorMessage).toBeDefined();
    })

    it("No username entered",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: '' } });
        fireEvent.input(passwordInput, { target: { value: '12345' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        
        const errorMessage = await screen.findByText("Empty username/password");
        // const errorMessage = await screen.findByText('Empty field(s) detected. Please check your input.');
        expect(errorMessage).toBeDefined();
    })

    it("No password entered",async () => {
        const usernameInput = screen.getByLabelText('Username (email)');
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.input(usernameInput, { target: { value: 'richard@smith.com' } });
        fireEvent.input(passwordInput, { target: { value: '' } });
    
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
            
        const errorMessage = await screen.findByText("Empty username/password");
        // const errorMessage = await screen.findByText('Empty field(s) detected. Please check your input.');
        expect(errorMessage).toBeDefined();
    })
    
})
