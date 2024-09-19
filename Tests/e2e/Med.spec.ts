import { test, expect, Page } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/nurseo_med/?location=14');
  await page.getByRole('button', { name: 'Anonymously Sign In' }).click();
  await medTests(page)
  await page.getByPlaceholder('Or type your badge number here').click();
  await page.getByPlaceholder('Or type your badge number here').fill('1');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await medTests(page)
});

async function medTests(page:Page) {
  await page.getByRole('button', { name: 'Select' }).click();
  await expect(page.locator('tbody')).toContainText('betamethasone (Celestone) 20 mg PO before meals NOW Order 2');
  await expect(page.locator('tbody')).toContainText('glucose tablets 20 mg PO daily as needed (PRN) PRN Note Order 1----Locate');
  await expect(page.locator('tbody')).toContainText('02:01 30 mg - LK');
  await page.getByRole('button', { name: 'Click here if you can\'t find' }).click();
  await expect(page.locator('#topLevelDiv')).toContainText('0.9% sodium chlorid (Normal Saline3)');
  await expect(page.locator('#topLevelDiv')).toContainText('10% dextrose in 0.9% sodium chloride with 40 mEq potassium chloride (D10 NS + 40 KCl)');
  await expect(page.locator('#topLevelDiv')).toContainText('amoxicillin / clavulanate potassium (Augmentin)Locate');
  await page.locator('div:nth-child(5) > div > .bg-primary').first().click();
  await expect(page.locator('#topLevelDiv')).toContainText('Medication is not available, please call pharmacy');
  await page.getByText('×').click();


  await page.locator('path').nth(1).click();
}