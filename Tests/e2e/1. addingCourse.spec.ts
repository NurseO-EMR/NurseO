import { test, expect } from '@playwright/test';

test('Adding Course', async ({ page }) => {
  await page.goto('http://localhost:3100/');
  
  await page.getByRole('link', { name: 'Create a new course' }).click();
  await page.getByLabel('Course Name').click();
  await page.getByLabel('Course Name').fill('Test Course ');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Go Home' }).click();
  await page.getByRole('link', { name: 'View/delete courses' }).click();
  await expect(page.getByLabel('Course name')).toHaveValue('Test Course ');
});