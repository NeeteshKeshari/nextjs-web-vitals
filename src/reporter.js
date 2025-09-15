import fs from 'fs';

/**
 * Generate JSON report
 */
export function generateReport(results) {
  const reportPath = './cwv-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`✅ Report saved to ${reportPath}`);
}
