import { test, expect } from '@playwright/test';

test('Adding Location', async ({ page }) => {
  await page.goto('http://localhost:3000/nurseo_admin');
  await page.getByRole('link', { name: 'Create a new location' }).click();
  await page.getByLabel('Building Name').click();
  await page.getByLabel('Building Name').fill('Building 1');
  await page.getByLabel('Building Name').press('Tab');
  await page.getByLabel('Station Name').fill('Building 2');
  await page.getByLabel('Station Name').press('Tab');
  await page.getByRole('button', { name: 'Previous' }).press('Tab');
  await page.getByRole('button', { name: 'Next' }).press('Enter');
  await page.getByRole('button', { name: 'Go Home' }).click();
  await page.getByRole('link', { name: 'View/delete locations' }).click();
  await expect(page.getByLabel('building name')).toHaveValue('Building 1');
  await expect(page.getByLabel('station name')).toHaveValue('Building 2');
  await page.getByRole('button', { name: 'Edit Courses' }).click();
  await page.locator('.css-19bb58m').click();
  await page.getByRole('option', { name: 'Test Course' }).click();
  await expect(page.locator('#topLevelDiv')).toContainText('Test Course');
  await expect(page.getByRole('cell', { name: 'Test Course' })).toBeVisible();

  await page.getByText('×').click();

});
