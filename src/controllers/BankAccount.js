export default class BankAccount {
    /**
     * @param {string} bankName
     * @param {string} accountNumber
     * @param {string} accountHolder
     */
    constructor(bankName, accountNumber, accountHolder, balance = 0) {
      this.bankName = bankName;
      this.accountNumber = accountNumber;
      this.accountHolder = accountHolder;
      this.balance = balance;
    }
  
    /**
     * @param {number} amount
     */
    deposit(amount) {
      if (amount > 0) {
        this.balance += amount;
        return `Deposited $${amount}. Current balance: $${this.balance}`;
      } else {
        return "Invalid deposit amount.";
      }
    }
  
    /**
     * @param {number} amount
     */
    withdraw(amount) {
      if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        return `Withdrawn $${amount}. Current balance: $${this.balance}`;
      } else {
        return "Invalid withdrawal amount or insufficient balance.";
      }
    }
  
    /**
     * @param {number} amount
     * @param {BankAccount} targetAccount
     */
    transfer(amount, targetAccount) {
      if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        targetAccount.balance += amount;
        return `Transferred $${amount} to account ${targetAccount.accountNumber}. Your balance: $${this.balance}`;
      } else {
        return "Invalid transfer amount or insufficient balance.";
      }
    }

    getBalance() {
        return this.balance;
    }
  
    getAccountNumber() {
        return this.accountNumber;
    }
      
    getBankName() {
        return this.bankName;
    }
  }
  
  
  // Usage
//   const account1 = new BankAccount("123456789", "John Doe", 1000);
//   const account2 = new BankAccount("987654321", "Jane Smith", 500);
  
//   console.log(account1.transfer(200, account2)); // Transferred $200 to account 987654321. Your balance: $800
//   console.log(account1.getBalance());             // Account balance: $800
//   console.log(account2.getBalance());             // Account balance: $700
