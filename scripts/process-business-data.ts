import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Process Excel files and extract business data
async function processBusinessData() {
  const attachedAssetsDir = path.join(process.cwd(), '..', 'attached_assets');
  const excelFiles = [
    'NationalDaily_Glossary_1753446244328.xlsx',
    'PartsDaily_1753446244347.xlsx', 
    'OpenOrder_1753446244347.xlsx'
  ];

  const businessData = {
    glossaries: {} as Record<string, any[]>,
    prompts: [] as any[],
    classifications: {} as Record<string, string>
  };

  for (const fileName of excelFiles) {
    const filePath = path.join(attachedAssetsDir, fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${fileName}`);
      continue;
    }

    try {
      console.log(`Processing ${fileName}...`);
      const workbook = XLSX.readFile(filePath);
      
      // Process each sheet
      for (const sheetName of workbook.SheetNames) {
        console.log(`  Processing sheet: ${sheetName}`);
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        // Determine data type based on filename and content
        const fileType = fileName.includes('Glossary') ? 'glossary' : 
                        fileName.includes('Parts') ? 'parts' : 'openorder';
        
        if (fileType === 'glossary') {
          businessData.glossaries[sheetName] = data;
        } else {
          // These might contain prompts or operational data
          businessData.prompts.push(...data.map(row => ({
            source: fileName,
            sheet: sheetName,
            data: row
          })));
        }
        
        console.log(`    Found ${data.length} records`);
      }
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  // Save processed data
  const outputDir = path.join(process.cwd(), '..', 'shared');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'business-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(businessData, null, 2));
  
  console.log('\n=== Business Data Processing Summary ===');
  console.log(`Glossaries: ${Object.keys(businessData.glossaries).length} categories`);
  console.log(`Prompts/Data: ${businessData.prompts.length} records`);
  console.log(`Output saved to: ${outputPath}`);
  
  // Display sample data for review
  console.log('\n=== Sample Glossary Data ===');
  for (const [category, terms] of Object.entries(businessData.glossaries)) {
    console.log(`\n${category} (${terms.length} terms):`);
    console.log(terms.slice(0, 3).map(term => `  - ${JSON.stringify(term)}`).join('\n'));
    if (terms.length > 3) console.log(`  ... and ${terms.length - 3} more`);
  }
  
  console.log('\n=== Sample Prompt Data ===');
  console.log(businessData.prompts.slice(0, 5).map((prompt, i) => 
    `${i + 1}. ${prompt.source}/${prompt.sheet}: ${JSON.stringify(prompt.data).substring(0, 100)}...`
  ).join('\n'));
  
  return businessData;
}

// Run the processing
processBusinessData().catch(console.error);