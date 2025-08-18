//module setup
import { test, expect } from '@playwright/test';
//test data

//testcase

//test suite
test('test', async ({ page }) => {
  await page.goto('https://dev.pippasync.customeradmin.boostonamazon.com/');

  await page.getByRole('textbox', { name: 'e.g. olivia@email.com' }).click();
  await page.getByRole('textbox', { name: 'e.g. olivia@email.com' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Type Password' }).click();
  await page.getByRole('textbox', { name: 'Type Password' }).fill('12345678');
  //verify signin page assertion
  await expect(page.getByText('Don\'t have an account?')).toBeVisible();
  await page.getByRole('button', { name: 'Sign In' }).click();

  //verify dashboard page assertion
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  //verify profile page assertion
  // await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();

  //signout
  await page.getByRole('link', { name: 'Sign Out' }).click(); await page.getByRole('link', { name: 'Sign Out' }).click();

});