import { test, expect, Page } from '@playwright/test';

test('EMR', async ({ page }) => {
  const id = Math.floor(Math.random() * 1000).toString()
  await page.goto('http://localhost:3000/nurseo/nurseo_emr?location=14');
  await page.getByPlaceholder('Or type your badge number here').click();
  await page.getByPlaceholder('Or type your badge number here').fill(id);
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await chartTests(page)
  await verifyStateBetweenSessions(page)
  await page.getByRole('button', { name: 'Anonymously Sign In' }).click();
  await chartTests(page)
});


async function chartTests(page: Page) {
  await page.getByPlaceholder('Or type the patient number').fill('123456');

  // arm band
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('main')).toContainText('Test Patient');
  await expect(page.getByRole('main')).toContainText('01/01/xxxx');
  await expect(page.getByRole('main')).toContainText('18 years old');
  await expect(page.getByRole('main')).toContainText('Allergy 1');
  await expect(page.getByRole('main')).toContainText('Flag 2');
  await expect(page.getByRole('main')).toContainText('175 cm');
  await expect(page.getByRole('main')).toContainText('80 kg');
  await expect(page.getByRole('main')).toContainText('12:00');

  // dashboard
  await expect(page.getByRole('main')).toContainText('diagnosis');
  await expect(page.getByRole('main')).toContainText('Flag 2');
  await expect(page.getByRole('main')).toContainText('Immunization 1');
  await expect(page.getByRole('main')).toContainText('Social History 1');
  await expect(page.getByRole('main')).toContainText('Reaction');
  await expect(page.getByRole('main')).toContainText('betamethasone (Celestone) 20 mg PO before meals NOW Order 2');
  await expect(page.locator('pre')).toContainText('bold test');

  //CC

  await page.locator('.border-4 > .svg-inline--fa > path').first().click();
  await page.getByLabel('Enter Chief Complaint').click();
  await page.getByLabel('Enter Chief Complaint').fill('This is a Chief Complaint');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('main')).toContainText('This is a Chief Complaint');
  // Notes Test

  await page.locator('.col-span-4 > .border-4 > .svg-inline--fa').click();
  await page.locator('#note div').nth(2).click();
  await page.locator('#note div').nth(2).fill('This is a note');
  await page.getByRole('button', { name: 'Add Note' }).click();
  await expect(page.getByRole('main')).toContainText('This is a note');

  // Medical History
  await page.locator('.col-span-3 > .border-4 > .svg-inline--fa > path').click();
  await page.getByLabel('Date').fill('2024-10-20');
  await page.getByLabel('Diagnosis Title').click();
  await page.getByLabel('Diagnosis Title').fill('Title Diagnosis');

  await page.locator('#note div').nth(2).click();
  await page.locator('#note div').nth(2).fill('This is the diagnosis note');
  await page.getByRole('button', { name: 'Add Note' }).click();
  await expect(page.getByRole('main')).toContainText('This is the diagnosis note');
  await expect(page.getByRole('main')).toContainText('Title Diagnosis');
  await expect(page.getByRole('main')).toContainText('2024-10-20');

  // medication tab
  await page.getByRole('link', { name: 'Medications', exact: true }).click();
  await page.waitForTimeout(2000)
  await expect(page.locator('tbody')).toContainText('betamethasone');
  await page.getByRole('link', { name: 'Allergies' }).click();
  await expect(page.locator('tbody')).toContainText('Allergy 1');
  await page.getByRole('link', { name: 'Flags' }).click();
  await expect(page.locator('tbody')).toContainText('Flag 2');

  //allergy
  await page.getByRole('link', { name: 'Allergies' }).click();
  await expect(page.locator('tbody')).toContainText('Reaction');
  await expect(page.locator('tbody')).toContainText('Allergy 1');

  //flags
  await page.getByRole('link', { name: 'Flags' }).click();
  await expect(page.locator('tbody')).toContainText('Flag 2');
  await expect(page.locator('tbody')).toContainText('Flag 2');

  // MAR
  await page.getByRole('link', { name: 'Mar', exact: true }).click();
  await page.getByRole('link', { name: 'View Mar' }).click();
  await expect(page.locator('tbody')).toContainText('betamethasone (Celestone) 20 mg PO before meals NOW Order 2');
  await expect(page.locator('tbody')).toContainText('02:01 30 mg');
  await page.getByRole('link', { name: 'Administer Medications' }).click();
  await page.getByPlaceholder('click here to scan the').click();

  await page.getByPlaceholder('click here to scan the').fill('100');
  await page.getByRole('button', { name: 'Administer' }).click();
  await page.getByPlaceholder('Dose or Rate').click();
  await page.getByPlaceholder('Dose or Rate').fill('200 mg');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('tbody')).toContainText('multivitamin');
  await expect(page.locator('tbody')).toContainText('12:00 200 mg');

  //vitals
  await page.getByRole('link', { name: 'Vitals', exact: true }).click();
  await page.locator('input[type="time"]').click();
  await page.locator('input[type="time"]').fill('14:45');
  await page.getByRole('row', { name: 'Temp' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'Temp' }).getByRole('spinbutton').fill('27.5');
  await page.getByRole('row', { name: 'HR' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'HR' }).getByRole('spinbutton').fill('120');
  await page.getByRole('row', { name: 'BP - Laying' }).getByRole('textbox').click();
  await page.getByRole('row', { name: 'BP - Laying' }).getByRole('textbox').fill('120/80');
  await page.getByRole('row', { name: 'RR' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'RR' }).getByRole('spinbutton').fill('100');
  await page.getByRole('row', { name: 'LPM' }).getByRole('combobox').selectOption('4');
  await page.getByRole('row', { name: 'Pain' }).getByRole('combobox').selectOption('Y');

  await page.getByLabel('Nurse Note').click();
  await page.getByLabel('Nurse Note').fill('This is a note from vitals tab');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('tbody')).toContainText('27.5');
  await expect(page.locator('tbody')).toContainText('120');
  await expect(page.locator('tbody')).toContainText('120/80');
  await expect(page.locator('tbody')).toContainText('100');
  await expect(page.locator('tbody')).toContainText('4');
  await expect(page.locator('tbody')).toContainText('Y');
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.getByRole('main')).toContainText('This is a note from vitals tab');

  await page.getByRole('navigation').locator('svg').click();

}

async function verifyStateBetweenSessions(page: Page) {
  page.reload()
  await page.getByPlaceholder('Or type your badge number here').click();
  await page.getByPlaceholder('Or type your badge number here').fill('1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.getByPlaceholder('Or type the patient number').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('main')).toContainText('This is a Chief Complaint');
  await expect(page.getByRole('main')).toContainText('This is the diagnosis note');
  await expect(page.getByRole('main')).toContainText('Title Diagnosis');
  await expect(page.getByRole('main')).toContainText('2024-10-20');
  await expect(page.getByRole('main')).toContainText('This is a note');
  await expect(page.getByRole('main')).toContainText('This is a note from vitals tab');
  await page.getByRole('navigation').locator('svg').click();
}