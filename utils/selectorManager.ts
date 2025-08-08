import * as fs from 'fs';
import * as path from 'path';

interface SelectorData {
  selectorName: string;
  pageName: string;
  selectorType: string;
  selector: string;
  comments: string;
}

interface SelectorListItem extends SelectorData {
  key: string;
}

export class SelectorManager {
  private csvPath: string;
  private selectors: Map<string, SelectorData>;

  constructor(csvPath: string = 'selectors.csv') {
    this.csvPath = csvPath;
    this.selectors = new Map();
    this.loadSelectors();
  }

  /**
   * Load selectors from CSV file
   */
  private loadSelectors(): void {
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
      console.error(`Error loading selectors from ${this.csvPath}:`, (error as Error).message);
    }
  }

  /**
   * Parse CSV line handling quoted values
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
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
  getSelector(pageName: string, selectorName: string): string {
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
  getPageSelectors(pageName: string): Record<string, string> {
    const pageSelectors: Record<string, string> = {};

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
  addSelector(selectorName: string, pageName: string, selectorType: string, selector: string, comments: string = ''): void {
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
  updateSelector(selectorName: string, pageName: string, newSelectorType: string, newSelector: string, newComments: string = ''): void {
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
  private saveAllSelectors(): void {
    let csvContent = 'selector_name,page_name,selector_type,selector,comments\n';

    for (const [key, data] of this.selectors) {
      csvContent += `${data.selectorName},${data.pageName},${data.selectorType},"${data.selector}","${data.comments}"\n`;
    }

    fs.writeFileSync(this.csvPath, csvContent);
  }

  /**
   * List all available selectors
   */
  listSelectors(): SelectorListItem[] {
    const selectorList: SelectorListItem[] = [];

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
  searchSelectors(keyword: string): SelectorListItem[] {
    const results: SelectorListItem[] = [];
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
  removeSelector(pageName: string, selectorName: string): void {
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
  getSelectorsByType(selectorType: string): SelectorListItem[] {
    const results: SelectorListItem[] = [];

    for (const [key, data] of this.selectors) {
      if (data.selectorType.toLowerCase() === selectorType.toLowerCase()) {
        results.push({ key, ...data });
      }
    }

    return results;
  }
}