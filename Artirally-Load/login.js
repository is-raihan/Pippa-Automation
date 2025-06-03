const { chromium } = require('playwright');

async function login(page) {
    try {
        // Navigate to the login page
        await page.goto('https://pippasync.customeradmin.boostonamazon.com/');
        
        // Wait for and fill in the email input
        await page.waitForSelector('//input[@placeholder="e.g. olivia@email.com"]');
        await page.fill('//input[@placeholder="e.g. olivia@email.com"]', 'isteyaq@dcpa.net');
        
        // Wait for and fill in the password input
        await page.waitForSelector('//input[@placeholder="Type Password"]');
        await page.fill('//input[@placeholder="Type Password"]', 'Test1234$$');
        
        // Click the submit button
        await page.click('//button[@type="submit"]');
        
        // Wait for navigation after login
        await page.waitForLoadState('networkidle');
        
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        return false;
    }
}

module.exports = { login }; 