// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(500);
});

test.describe('add points', () => {
  test('disabled submit', async ({ page }) => {
    await page.locator('button[type="submit"]').isDisabled();
  });

  test('new point', async ({ page }) => {
    await expect(page.locator('input#search-form[type="text"]')).toBeVisible();
    await page.locator('input[type="text"]').fill('Москва');
    await page.keyboard.press('Enter');
    await expect(page.$('text=Россия, Москва')).not.toBeNull();
    expect(await page.locator('text=Россия, Москва').getAttribute('id')).toBe('point-1-0');
  });

  test('two new point', async ({ page }) => {
    await expect(page.locator('input#search-form[type="text"]')).toBeVisible();
    await page.locator('input[type="text"]').fill('Москва');
    await page.keyboard.press('Enter');
    await expect(page.$('text=Россия, Москва')).not.toBeNull();
    expect(await page.locator('text=Россия, Москва').getAttribute('id')).toBe('point-1-0');
    await page.locator('input#search-form[type="text"]').fill('Химки');
    await page.keyboard.press('Enter');
    await expect(page.$('text=Россия, Московская область, Химки')).not.toBeNull();
    expect(await page.locator('text=Россия, Московская область, Химки').getAttribute('id')).toBe('point-2-1');
  });
});

test.describe('drag and drop', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('input[type="text"]').fill('Москва');
    await page.keyboard.press('Enter');

    await page.locator('input#search-form[type="text"]').fill('Химки');
    await page.keyboard.press('Enter');
  });

  test('first point to end', async ({ page }) => {
    const firstPoint = await page.locator('text=Россия, Москва');
    const secondPoint = await page.locator('text=Россия, Московская область, Химки');
    await firstPoint.hover();
    await page.mouse.down();
    const box = await secondPoint.boundingBox();
    await page.mouse.move(box.x + box.width / 3, box.y + box.height / 3);
    await secondPoint.hover();
    await page.mouse.up();
    await expect(await page.locator('text=Россия, Москва').getAttribute('id')).toBe('point-1-1');
    await expect(await page.locator('text=Россия, Московская область, Химки').getAttribute('id')).toBe('point-2-0');
  });
});

test.describe('remove point', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('input[type="text"]').fill('Москва');
    await page.keyboard.press('Enter');
    await page.locator('input#search-form[type="text"]').fill('Химки');
    await page.keyboard.press('Enter');
  });

  test('remove first point', async ({ page }) => {
    const firstPoint = await page.locator('text=Россия, Москва').getAttribute('id');
    const button = await page.locator(`id=${firstPoint} >> .deletePoint`);
    await button.click();
    expect(await page.$('text=Россия, Москва')).toBeNull();
    expect(await page.$('text=Россия, Московская область, Химки')).not.toBeNull();
  });

  test('remove all point', async ({ page }) => {
    const button = await page.locator('.deleteAllPoints');
    await button.click();
    expect(await page.$('text=Россия, Москва')).toBeNull();
    expect(await page.$('text=Россия, Московская область, Химки')).toBeNull();
  });
});
