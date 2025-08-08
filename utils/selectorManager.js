const fs = require('fs');
const path = require('path');

class SelectorManager {
  constructor(csvPath = 'selectors.csv') {
    this.csvPath = csvPath;
    this.selectors = new Map();
    this.loadSelectors();
  }

  /**
   * Load selectors from CSV file
   */
  loadSelectors() {
    try {
      const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim());
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const [selectorName, pageName, selectorType, selector, comments] = this.parseCSVLine(lines[i]);
        
        if (selectorName && pageName && selector) {
          const key = `${pageName}.${selectorName}`;
          this.selectors.set(key, {
            selectorName,
            pageName,
            selectorType: selectorType || '',
            selector,
            comments: comments || ''
          });
        }
      }
      
      console.log(`Loaded ${this.selectors.size} selectors from ${this.csvPath}`);
    } catch (error) {
      console.error(`Error loading selectors from ${this.csvPath}:`, error.message);
    }
  }

  /**
   * Parse CSV line handling quoted values
   */
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  /**
   * Get selector by page and selector name
   */
  getSelector(pageName, selectorName) {
    const key = `${pageName}.${selectorName}`;
    const selectorData = this.selectors.get(key);
    
    if (!selectorData) {
      throw new Error(`Selector not found: ${key}`);
    }
    
    return selectorData.selector;
  }

  /**
   * Get all selectors for a specific page
   */
  getPageSelectors(pageName) {
    const pageSelectors = {};
    
    for (const [key, data] of this.selectors) {
      if (data.pageName === pageName) {
        pageSelectors[data.selectorName] = data.selector;
      }
    }
    
    return pageSelectors;
  }

  /**
   * Add a new selector to the CSV file
   */
  addSelector(selectorName, pageName, selectorType, selector, comments = '') {
    const key = `${pageName}.${selectorName}`;
    
    // Add to memory
    this.selectors.set(key, { selectorName, pageName, selectorType, selector, comments });
    
    // Append to CSV file
    const csvLine = `${selectorName},${pageName},${selectorType},"${selector}","${comments}"\n`;
    fs.appendFileSync(this.csvPath, csvLine);
    
    console.log(`Added selector: ${key}`);
  }

  /**
   * Update an existing selector
   */
  updateSelector(selectorName, pageName, newSelectorType, newSelector, newComments = '') {
    const key = `${pageName}.${selectorName}`;
    
    if (!this.selectors.has(key)) {
      throw new Error(`Selector not found: ${key}`);
    }
    
    // Update in memory
    this.selectors.set(key, { 
      selectorName, 
      pageName, 
      selectorType: newSelectorType, 
      selector: newSelector, 
      comments: newComments 
    });
    
    // Rewrite entire CSV file
    this.saveAllSelectors();
    
    console.log(`Updated selector: ${key}`);
  }

  /**
   * Save all selectors back to CSV file
   */
  saveAllSelectors() {
    let csvContent = 'selector_name,page_name,selector_type,selector,comments\n';
    
    for (const [key, data] of this.selectors) {
      csvContent += `${data.selectorName},${data.pageName},${data.selectorType},"${data.selector}","${data.comments}"\n`;
    }
    
    fs.writeFileSync(this.csvPath, csvContent);
  }

  /**
   * List all available selectors
   */
  listSelectors() {
    const selectorList = [];
    
    for (const [key, data] of this.selectors) {
      selectorList.push({
        key,
        selectorName: data.selectorName,
        pageName: data.pageName,
        selectorType: data.selectorType,
        selector: data.selector,
        comments: data.comments
      });
    }
    
    return selectorList;
  }

  /**
   * Search selectors by keyword
   */
  searchSelectors(keyword) {
    const results = [];
    const searchTerm = keyword.toLowerCase();
    
    for (const [key, data] of this.selectors) {
      if (
        data.selectorName.toLowerCase().includes(searchTerm) ||
        data.pageName.toLowerCase().includes(searchTerm) ||
        data.selectorType.toLowerCase().includes(searchTerm) ||
        data.selector.toLowerCase().includes(searchTerm) ||
        data.comments.toLowerCase().includes(searchTerm)
      ) {
        results.push({ key, ...data });
      }
    }
    
    return results;
  }

  /**
   * Remove a selector
   */
  removeSelector(pageName, selectorName) {
    const key = `${pageName}.${selectorName}`;
    
    if (!this.selectors.has(key)) {
      throw new Error(`Selector not found: ${key}`);
    }
    
    this.selectors.delete(key);
    this.saveAllSelectors();
    
    console.log(`Removed selector: ${key}`);
  }

  /**
   * Get selectors by type
   */
  getSelectorsByType(selectorType) {
    const results = [];
    
    for (const [key, data] of this.selectors) {
      if (data.selectorType.toLowerCase() === selectorType.toLowerCase()) {
        results.push({ key, ...data });
      }
    }
    
    return results;
  }
}

module.exports = SelectorManager;