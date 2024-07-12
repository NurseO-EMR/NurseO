import { test, expect } from '@playwright/test';

test('create patient', async ({ page }) => {
  await page.goto('http://localhost:3100/');
  await page.getByRole('link', { name: 'Create Patient' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('Test Patient');
  await page.getByLabel('Date of birth').fill('1999-01-01');
  await page.getByLabel('Date of birth').press('Tab');
  await page.getByLabel('Gender').selectOption('male');
  await page.getByLabel('Height').click();
  await page.getByLabel('Height').fill('175 cm');
  await page.getByLabel('Height').press('Tab');
  await page.getByLabel('Weight').fill('80 kg');
  await page.getByLabel('Weight').press('Tab');

  await page.locator('textarea').click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('diagnosis ');

  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Barcode').click();
  await page.getByLabel('Barcode').fill('123456');
  await page.getByLabel('Barcode').press('Tab');
  await page.getByLabel('Age').fill('18 years old');
  await page.getByLabel('Age').press('Tab');
  await page.getByLabel('Date Format').selectOption('HiddenYear');
  await page.getByLabel('SimTime').press('Tab');
  await page.getByLabel('SimTime').press('Tab');
  await page.getByLabel('SimTime').fill('12:00');
  await page.getByLabel('SimTime').press('Tab');
  await page.getByLabel('Course').selectOption('1');
  await page.getByRole('button', { name: 'Next' }).click();

  // flags
  await page.getByLabel('Flag (optional)').click();
  await page.getByLabel('Flag (optional)').fill('flag 1');
  await page.getByLabel('Flag (optional)').press('Tab');
  await page.getByLabel('Reason (optional)').fill('flag 2');


  await page.getByRole('button', { name: 'Add Flag' }).click();
  await expect(page.locator('tbody')).toContainText('flag 1');
  await expect(page.locator('tbody')).toContainText('flag 2');
  await expect(page.getByText('Added FlagsFlagReasonDeleteflag 1flag 2Delete')).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();

  await page.getByLabel('Flag (optional)').click();
  await page.getByLabel('Flag (optional)').fill('Flag 2');
  await page.getByLabel('Flag (optional)').press('Tab');
  await page.getByLabel('Reason (optional)').fill('Flag 2');
  await page.getByRole('button', { name: 'Add Flag' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Reaction
  await page.getByLabel('Allergy Name (optional)').click();
  await page.getByLabel('Allergy Name (optional)').fill('Allergy 1');
  await page.getByLabel('Allergy Name (optional)').press('Tab');
  await page.getByLabel('Reaction (optional)').fill('Alleg');
  await page.getByLabel('Reaction (optional)').press('ControlOrMeta+a');
  await page.getByLabel('Reaction (optional)').fill('Reaction');

  await page.getByRole('button', { name: 'Add Allergy' }).click();
  await expect(page.locator('tbody')).toContainText('Allergy 1');
  await expect(page.locator('tbody')).toContainText('Reaction');
  await page.getByRole('button', { name: 'Next' }).click();

  // Immunizations

  await page.getByLabel('Immunization name (optional)').click();
  await page.getByLabel('Immunization name (optional)').fill('Immunization 1');
  await page.getByRole('button', { name: 'Add Immunization Entry' }).click();
  await expect(page.locator('tbody')).toContainText('Immunization 1');
  await page.getByRole('button', { name: 'Next' }).click();

  // Medical History

  await page.getByLabel('Date (optional)').fill('2024-07-22');
  await page.getByLabel('Diagnosis Title (optional)').click();
  await page.getByLabel('Diagnosis Title (optional)').fill('Diagnosis 1');
  await page.getByLabel('Notes (optional)').click();
  await page.getByLabel('Notes (optional)').fill('Notes');
  await page.getByRole('button', { name: 'Add Medical History Entry' }).click();
  await page.getByLabel('Diagnosis Title (optional)').click();
  await page.getByLabel('Diagnosis Title (optional)').fill('Diagnois');
  await page.getByLabel('Diagnosis Title (optional)').press('Tab');
  await page.getByRole('button', { name: 'Add Medical History Entry' }).click();
  await expect(page.locator('tbody')).toContainText('2024-07-22');
  await expect(page.locator('tbody')).toContainText('Diagnosis 1');
  await expect(page.locator('tbody')).toContainText('Notes');
  await expect(page.locator('tbody')).toContainText('Diagnois');
  await page.getByRole('button', { name: 'Next' }).click();

  // Social History

  await page.getByLabel('Entry (optional)').click();
  await page.getByLabel('Entry (optional)').fill('Social History 1');
  await page.getByRole('button', { name: 'Add Social History Entry' }).click();
  await expect(page.locator('tbody')).toContainText('Social History 1');
  await page.getByRole('button', { name: 'Next' }).click();

  // Medication Name
  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
  await page.getByRole('option', { name: 'glucose tablets' }).click();
  await page.getByPlaceholder('ex: 20mg/kg').click();
  await page.getByPlaceholder('ex: 20mg/kg').fill('20 mg');
  await page.getByPlaceholder('ex: 20mg/kg').press('Tab');
  await page.getByLabel('Route (optional)').fill('PO');
  await page.getByLabel('Route (optional)').press('Tab');
  await page.getByLabel('Routine (optional)').selectOption('as needed (PRN)');
  await page.getByLabel('PRN Note (optional)').click();
  await page.getByLabel('PRN Note (optional)').fill('PRN Note');
  await page.getByLabel('Frequency (optional)').selectOption(' daily');
  await page.getByLabel('Notes (optional)').click();
  await page.getByLabel('Notes (optional)').fill('20');
  await page.getByLabel('Order Type (optional)').selectOption('Admission');
  await page.getByLabel('Notes (optional)').click();
  await page.getByLabel('Notes (optional)').fill('Order 1');
  await page.getByLabel('Completed').selectOption('true');
  await page.getByRole('button', { name: 'Add Order' }).click();

  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
  await page.getByRole('option', { name: 'betamethasone' }).click();
  await page.getByPlaceholder('ex: 20mg/kg').click();
  await page.getByPlaceholder('ex: 20mg/kg').fill('20 mg');
  await page.getByPlaceholder('ex: 20mg/kg').press('Tab');
  await page.getByLabel('Route (optional)').fill('PO');
  await page.getByLabel('Routine (optional)').selectOption('NOW');
  await page.getByLabel('Frequency (optional)').selectOption('before meals');
  await page.getByRole('button', { name: 'Add/Edit Mar Record' }).click();
  await page.getByLabel('Time', { exact: true }).click();
  await page.getByLabel('Time', { exact: true }).fill('02:01');
  await page.getByLabel('Dose (with units)').click();
  await page.getByLabel('Dose (with units)').fill('30 mg');
  await page.getByRole('button', { name: 'Add Record' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByLabel('Order Type (optional)').selectOption('Admission');
  await page.getByLabel('Completed').selectOption('false');
  await page.getByLabel('Notes (optional)').click();
  await page.getByLabel('Notes (optional)').fill('Order 2');
  await page.getByRole('button', { name: 'Add Order' }).click();
  await expect(page.locator('#topLevelDiv')).toContainText('glucose tablets 20 mg PO daily as needed (PRN) PRN Note Order 1');
  await expect(page.locator('#topLevelDiv')).toContainText('Completed');
  await expect(page.locator('#topLevelDiv')).toContainText('betamethasone (Celestone) 20 mg PO before meals NOW Order 2');
  await expect(page.locator('#topLevelDiv')).toContainText('Mar: 02:01');
  await expect(page.locator('#topLevelDiv')).toContainText('Mar: No mar data added');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('Patient Updated').first()).toBeVisible();
  await page.getByRole('button', { name: 'Previous' }).click();

  await page.locator('svg:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('Patient Updated').first()).toBeVisible();

  // Custom Orders
  await page.getByLabel('Time (optional)').first().click();
  await page.getByLabel('Time (optional)').first().fill('time 1');

  await page.locator('.ql-editor').click();

  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('line 1\n\nline 2\n\n            space with lines\n\nbold test');
  await page.getByLabel('Order Type (optional)').selectOption('Admission');
  await page.getByRole('button', { name: 'Add Custom Order Entry' }).click();

  await expect(page.locator('tbody')).toContainText('Admission');
  await expect(page.locator('tbody')).toContainText('time 1');
  await page.getByLabel('Time (optional)').click();
  await page.getByLabel('Time (optional)').press('ControlOrMeta+a');
  await page.getByLabel('Time (optional)').fill('');
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('erffefw');
  await page.locator('.ql-editor').press('ControlOrMeta+a');
  await page.locator('div').filter({ hasText: /^erffefw$/ }).nth(1).fill('test 2');
  await page.getByLabel('Order Type (optional)').selectOption('');
  await page.getByRole('button', { name: 'Add Custom Order Entry' }).click();
  await expect(page.locator('tbody')).toContainText('test 2');
  await page.getByRole('button', { name: 'Next' }).click();


  // Charting
  await page.getByPlaceholder('Day/Time').first().click();
  await page.getByPlaceholder('Day/Time').first().fill('today');
  await page.getByPlaceholder('Day/Time').first().press('Tab');
  await page.getByPlaceholder('Day/Time').nth(1).fill('tomorrow');
  
  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(0).click();
  await page.getByRole('option', { name: 'Temp' }).click();
  await page.getByRole('row', { name: 'Temp' }).getByLabel('value (optional)').first().click();
  await page.getByRole('row', { name: 'Temp' }).getByLabel('value (optional)').first().fill('37.5');
  await page.getByRole('row', { name: 'Temp' }).getByLabel('value (optional)').first().press('Tab');
  await page.getByRole('row', { name: 'Temp' }).getByLabel('value (optional)').nth(1).fill('38.5');
  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(1).click();
  await page.locator('#react-select-5-input').fill('Test');
  await page.getByRole('option', { name: 'Create "Test"' }).click();
  await page.getByRole('row', { name: 'Test' }).getByLabel('value (optional)').first().click();
  await page.getByRole('row', { name: 'Test' }).getByLabel('value (optional)').first().fill('1');
  await page.getByRole('row', { name: 'Test' }).getByLabel('value (optional)').first().press('Tab');
  await page.getByRole('row', { name: 'Test' }).getByLabel('value (optional)').nth(1).fill('2');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#topLevelDiv')).toContainText('Initial Vitals has 4 entries');
  await page.locator('div').filter({ hasText: /^Assessment$/ }).click();
  await page.locator('.css-19bb58m').click();
  await page.getByRole('option', { name: 'Moisture' }).click();
  await page.getByPlaceholder('Day/Time').first().click();
  await page.getByPlaceholder('Day/Time').first().fill('today');
  await page.getByPlaceholder('Day/Time').first().press('Tab');
  await page.getByRole('row', { name: 'Moisture' }).getByRole('cell').nth(1).click();
  await page.getByLabel('value (optional)').first().fill('1');
  await page.getByPlaceholder('Day/Time').nth(1).click();
  await page.getByPlaceholder('Day/Time').nth(1).fill('tomorrow');
  await page.getByRole('row', { name: 'Moisture' }).getByLabel('value (optional)').nth(1).click();
  await page.getByRole('row', { name: 'Moisture' }).getByLabel('value (optional)').nth(1).fill('2');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#topLevelDiv')).toContainText('Skin has 2 entries');
  await page.getByRole('button', { name: 'Next' }).click();

  // review

  await expect(page.locator('form')).toContainText('Name: Test Patient');
  await expect(page.locator('form')).toContainText('DOB: 01/01/xxxx');
  await expect(page.locator('form')).toContainText('Gender: male');
  await expect(page.locator('form')).toContainText('Height: 175 cm');
  await expect(page.locator('form')).toContainText('Weight: 80 kg');
  await expect(page.locator('form')).toContainText('Sim InfoBarcode: 123456Age: 18 years oldSim Time: 12:0Labs URL:');
  await expect(page.locator('form')).toContainText('AllergiesAllergy 0 name: Allergy 1Allergy 0 reaction: Reaction');
  await expect(page.locator('form')).toContainText('ImmunizationsImmunization 0: Immunization 1');
  await expect(page.locator('form')).toContainText('Medical HistoryMedical History 0 date: 2024-07-22Medical History 0 title: Diagnosis 1Medical History 0 notes: NotesMedical History 1 date: Medical History 1 title: DiagnoisMedical History 1 notes:');
  await expect(page.locator('form')).toContainText('Social HistoryImmunization 0: Social History 1');
  await page.getByRole('button', { name: 'Update Patient' }).click();
  await page.getByRole('button', { name: 'Go Home' }).click();
  await expect(page.getByText('Patients Create Patient View/Edit PatientsMedications Create Medication Add')).toBeVisible();
});