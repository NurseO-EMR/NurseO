import { test, expect } from '@playwright/test';

test('EMR', async ({ page }) => {
  await page.goto('http://localhost:3101/?location=1');
  await page.getByPlaceholder('Or type your badge number here').click();
  await page.getByPlaceholder('Or type your badge number here').fill('1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.getByPlaceholder('Or type the patient number').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByRole('main')).toContainText('Test Patient');

  await expect(page.getByRole('main')).toContainText('01/01/xxxx');
  await expect(page.getByRole('main')).toContainText('18 years old');
  await expect(page.getByRole('main')).toContainText('Allergy 1,');
  await expect(page.getByRole('main')).toContainText('Flag 2');
  await expect(page.getByRole('main')).toContainText('175 cm');
  await expect(page.getByRole('main')).toContainText('80 kg');
  await expect(page.getByRole('main')).toContainText('12:00');
  await expect(page.getByRole('main')).toContainText('diagnosis');
  await expect(page.getByRole('main')).toContainText('Flag 2');
  await expect(page.getByRole('main')).toContainText('Immunization 1');
  await expect(page.getByRole('main')).toContainText('2024-07-22');
  await expect(page.getByRole('main')).toContainText('Diagnosis 1');
  await expect(page.getByRole('main')).toContainText('Notes');
  await expect(page.getByRole('main')).toContainText('diagnosis');
  await expect(page.getByRole('main')).toContainText('time 1');
  await expect(page.getByRole('main')).toContainText('Admission');
  await expect(page.locator('pre')).toContainText('line 1');
  await expect(page.getByRole('main')).toContainText('line 1');
  await expect(page.getByRole('main')).toContainText('Social History 1');
  await page.getByRole('link', { name: 'Medications', exact: true }).click();

  // Medication 
  // TODO: add meds test
  // Allergies

  await page.getByRole('link', { name: 'Allergies' }).click();
  await expect(page.locator('tbody')).toContainText('Allergy 1');
  await expect(page.locator('tbody')).toContainText('Reaction');

  // flags
  await page.getByRole('link', { name: 'Flags' }).click();

  await expect(page.locator('tbody')).toContainText('Flag 2');
  await expect(page.locator('tbody')).toContainText('Flag 2');
  //orders
  await page.getByRole('link', { name: 'Orders', exact: true }).click();
  await expect(page.locator('tbody')).toContainText('time 1');
  await expect(page.locator('tbody')).toContainText('Admission');
  await expect(page.locator('tbody')).toContainText('line 1');
  await page.getByRole('link', { name: 'Admission Orders' }).click();
  await page.getByRole('link', { name: 'Standing Orders' }).click();
  await page.getByRole('link', { name: 'Provider Orders' }).click();
  await page.getByRole('link', { name: 'Mar', exact: true }).click();
  // MAR 
  await page.getByRole('link', { name: 'Mar', exact: true }).click();
  await page.getByRole('link', { name: 'Administer Medications' }).click();
  // TODO: Add MAR test
  // Vitals

  await page.getByRole('link', { name: 'View Vitals' }).click();
  await expect(page.locator('tbody')).toContainText('Temp');
  await expect(page.locator('tbody')).toContainText('37.5');
  await expect(page.locator('tbody')).toContainText('38.5');
  await expect(page.locator('thead')).toContainText('today');
  await expect(page.locator('thead')).toContainText('tomorrow');
  await expect(page.getByRole('button')).toContainText('Initial Vitals');
  await expect(page.locator('tbody')).toContainText('test');
  await expect(page.locator('tbody')).toContainText('1');
  await expect(page.locator('tbody')).toContainText('2');
  await page.getByRole('link', { name: 'Submit Vitals' }).click();
  await page.locator('input[type="time"]').click();
  await page.locator('input[type="time"]').fill('23:58');
  await page.getByRole('row', { name: 'Temp' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'Temp' }).getByRole('spinbutton').fill('123');
  
  await page.getByRole('row', { name: 'BP - Laying' }).getByRole('textbox').click();
  await page.getByRole('row', { name: 'BP - Laying' }).getByRole('textbox').fill('erfwefwe');
  
  await page.getByRole('row', { name: 'Pain' }).getByRole('combobox').selectOption('Y');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('erge');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('tbody')).toContainText('erfwefwe');
  await expect(page.locator('thead')).toContainText('23:58');
  await expect(page.locator('tbody')).toContainText('Y');
  await expect(page.locator('tbody')).toContainText('123');

  // Assessment 
  await page.getByRole('link', { name: 'View Assessment' }).click();
  await expect(page.locator('tbody')).toContainText('Moisture');
  await expect(page.locator('tbody')).toContainText('1');
  await expect(page.locator('tbody')).toContainText('2');
  
  // IO

  await page.getByRole('link', { name: 'View I/O Record' }).click();
  await expect(page.getByRole('main')).toContainText('No Data Available');
  

  // Labs

  await page.getByRole('link', { name: 'View Lab Results' }).click();
  await expect(page.getByRole('main')).toContainText('No Labs Available');
  await page.getByRole('link', { name: 'View Imaging Results' }).click();
  await expect(page.getByRole('main')).toContainText('No Labs Available');

  // logout

  await page.locator('path').click();
  
  await expect(page.getByPlaceholder('Or type your badge number here')).toBeVisible();

});