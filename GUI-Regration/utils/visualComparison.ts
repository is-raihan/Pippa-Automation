import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as fs from 'fs';
import * as path from 'path';

export class VisualComparison {
  private baselineDir: string;
  private diffDir: string;

  constructor() {
    this.baselineDir = path.join(process.cwd(), 'baseline');
    this.diffDir = path.join(process.cwd(), 'diff');
    this.ensureDirectories();
  }

  private ensureDirectories() {
    [this.baselineDir, this.diffDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async compareScreenshots(
    currentScreenshot: Buffer,
    baselineName: string,
    threshold: number = 0.1
  ): Promise<{ match: boolean; diffPercentage: number }> {
    const baselinePath = path.join(this.baselineDir, `${baselineName}.png`);
    const diffPath = path.join(this.diffDir, `${baselineName}-diff.png`);

    // If baseline doesn't exist, save current screenshot as baseline
    if (!fs.existsSync(baselinePath)) {
      fs.writeFileSync(baselinePath, currentScreenshot);
      return { match: true, diffPercentage: 0 };
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(currentScreenshot);
    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    const diffPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      width,
      height,
      {
        threshold,
        includeAA: true,
      }
    );

    const diffPercentage = (diffPixels / (width * height)) * 100;
    const match = diffPercentage <= threshold * 100;

    if (!match) {
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return { match, diffPercentage };
  }
} 