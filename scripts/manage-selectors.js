#!/usr/bin/env node

const SelectorManager = require('../utils/selectorManager');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const selectorManager = new SelectorManager();

function showMenu() {
  console.log('\n=== Selector Manager ===');
  console.log('1. List all selectors');
  console.log('2. Search selectors');
  console.log('3. Get page selectors');
  console.log('4. Get selectors by type');
  console.log('5. Add new selector');
  console.log('6. Update selector');
  console.log('7. Remove selector');
  console.log('8. Get specific selector');
  console.log('9. Exit');
  console.log('========================');
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function listAllSelectors() {
  const selectors = selectorManager.listSelectors();
  console.log('\nAll Selectors:');
  console.log('==============');
  selectors.forEach(selector => {
    console.log(`${selector.key} [${selector.selectorType}]: ${selector.selector}`);
    if (selector.comments) {
      console.log(`  Comments: ${selector.comments}`);
    }
    console.log('');
  });
}

async function searchSelectors() {
  const keyword = await askQuestion('Enter search keyword: ');
  const results = selectorManager.searchSelectors(keyword);
  
  console.log(`\nSearch results for "${keyword}":`);
  console.log('================================');
  
  if (results.length === 0) {
    console.log('No selectors found.');
  } else {
    results.forEach(selector => {
      console.log(`${selector.key} [${selector.selectorType}]: ${selector.selector}`);
      if (selector.comments) {
        console.log(`  Comments: ${selector.comments}`);
      }
      console.log('');
    });
  }
}

async function getSelectorsByType() {
  const selectorType = await askQuestion('Enter selector type (button, input, link, etc.): ');
  const results = selectorManager.getSelectorsByType(selectorType);
  
  console.log(`\nSelectors of type "${selectorType}":`);
  console.log('==================================');
  
  if (results.length === 0) {
    console.log('No selectors found for this type.');
  } else {
    results.forEach(selector => {
      console.log(`${selector.key}: ${selector.selector}`);
      if (selector.comments) {
        console.log(`  Comments: ${selector.comments}`);
      }
      console.log('');
    });
  }
}

async function getPageSelectors() {
  const pageName = await askQuestion('Enter page name: ');
  const selectors = selectorManager.getPageSelectors(pageName);
  
  console.log(`\nSelectors for page "${pageName}":`);
  console.log('============================');
  
  if (Object.keys(selectors).length === 0) {
    console.log('No selectors found for this page.');
  } else {
    Object.entries(selectors).forEach(([selectorName, selector]) => {
      console.log(`${selectorName}: ${selector}`);
    });
  }
}

async function addNewSelector() {
  const selectorName = await askQuestion('Enter selector name: ');
  const pageName = await askQuestion('Enter page name: ');
  const selectorType = await askQuestion('Enter selector type (button, input, link, etc.): ');
  const selector = await askQuestion('Enter CSS selector: ');
  const comments = await askQuestion('Enter comments (optional): ');
  
  try {
    selectorManager.addSelector(selectorName, pageName, selectorType, selector, comments);
    console.log(`\nSelector added successfully: ${pageName}.${selectorName}`);
  } catch (error) {
    console.error('Error adding selector:', error.message);
  }
}

async function updateSelector() {
  const selectorName = await askQuestion('Enter selector name: ');
  const pageName = await askQuestion('Enter page name: ');
  const newSelectorType = await askQuestion('Enter new selector type: ');
  const newSelector = await askQuestion('Enter new CSS selector: ');
  const newComments = await askQuestion('Enter new comments (optional): ');
  
  try {
    selectorManager.updateSelector(selectorName, pageName, newSelectorType, newSelector, newComments);
    console.log(`\nSelector updated successfully: ${pageName}.${selectorName}`);
  } catch (error) {
    console.error('Error updating selector:', error.message);
  }
}

async function removeSelector() {
  const pageName = await askQuestion('Enter page name: ');
  const selectorName = await askQuestion('Enter selector name: ');
  
  try {
    selectorManager.removeSelector(pageName, selectorName);
    console.log(`\nSelector removed successfully: ${pageName}.${selectorName}`);
  } catch (error) {
    console.error('Error removing selector:', error.message);
  }
}

async function getSpecificSelector() {
  const pageName = await askQuestion('Enter page name: ');
  const selectorName = await askQuestion('Enter selector name: ');
  
  try {
    const selector = selectorManager.getSelector(pageName, selectorName);
    console.log(`\nSelector for ${pageName}.${selectorName}:`);
    console.log(selector);
  } catch (error) {
    console.error('Error getting selector:', error.message);
  }
}

async function main() {
  console.log('Welcome to Selector Manager!');
  
  while (true) {
    showMenu();
    const choice = await askQuestion('Enter your choice (1-9): ');
    
    switch (choice) {
      case '1':
        await listAllSelectors();
        break;
      case '2':
        await searchSelectors();
        break;
      case '3':
        await getPageSelectors();
        break;
      case '4':
        await getSelectorsByType();
        break;
      case '5':
        await addNewSelector();
        break;
      case '6':
        await updateSelector();
        break;
      case '7':
        await removeSelector();
        break;
      case '8':
        await getSpecificSelector();
        break;
      case '9':
        console.log('Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Please try again.');
    }
    
    await askQuestion('\nPress Enter to continue...');
  }
}

main().catch(console.error);