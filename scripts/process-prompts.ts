import * as fs from 'fs';
import * as path from 'path';

// Process the CSV prompts data and integrate with business knowledge
async function processPrompts() {
  const csvPath = path.join(process.cwd(), '..', 'attached_assets', 'Weekly_Prompts_Unique_545_1753446523107.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  
  // Parse CSV manually (simple implementation)
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  const prompts = lines.slice(1).map((line, index) => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    const promptData: any = {};
    headers.forEach((header, i) => {
      promptData[header.trim()] = values[i]?.replace(/"/g, '') || '';
    });
    
    return {
      id: promptData.ID,
      category: promptData.Category,
      prompt: promptData.Prompt,
      greenRange: promptData.GreenRange,
      yellowRange: promptData.YellowRange,
      redRange: promptData.RedRange,
      simulatedValue: parseFloat(promptData.SimulatedValue) || 0,
      status: promptData.Status,
      action: promptData.Action,
      lineNumber: index + 2
    };
  });

  console.log(`\n=== PROMPTS PROCESSING REPORT ===`);
  console.log(`Total prompts processed: ${prompts.length}`);
  
  // Analyze categories
  const categories = prompts.reduce((acc, prompt) => {
    acc[prompt.category] = (acc[prompt.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\nCategories:');
  for (const [category, count] of Object.entries(categories)) {
    console.log(`  ${category}: ${count} prompts`);
  }
  
  // Analyze classifications
  const classifications = prompts.reduce((acc, prompt) => {
    acc[prompt.status] = (acc[prompt.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\nClassifications:');
  for (const [status, count] of Object.entries(classifications)) {
    console.log(`  ${status}: ${count} prompts`);
  }
  
  // Agent mapping analysis
  const agentMapping = {
    'Performance Analytics AI': prompts.filter(p => 
      p.prompt.includes('revenue') || p.prompt.includes('profit') || p.prompt.includes('volume')
    ),
    'Route Optimization Engine': prompts.filter(p => 
      p.category === 'Capacity & Routing'
    ),
    'Regional Performance Monitor': prompts.filter(p => 
      p.prompt.includes('planning area')
    ),
    'Parts Prediction Engine': prompts.filter(p => 
      p.prompt.includes('parts') || p.prompt.includes('cost')
    )
  };
  
  console.log('\nAgent Mapping Analysis:');
  for (const [agent, mappedPrompts] of Object.entries(agentMapping)) {
    console.log(`  ${agent}: ${mappedPrompts.length} relevant prompts`);
  }
  
  // Classification accuracy analysis
  const classificationAnalysis = {
    red: prompts.filter(p => p.status === 'Red'),
    yellow: prompts.filter(p => p.status === 'Yellow'), 
    green: prompts.filter(p => p.status === 'Green')
  };
  
  console.log('\nClassification Distribution:');
  console.log(`  Red (Critical): ${classificationAnalysis.red.length} (${((classificationAnalysis.red.length / prompts.length) * 100).toFixed(1)}%)`);
  console.log(`  Yellow (Monitor): ${classificationAnalysis.yellow.length} (${((classificationAnalysis.yellow.length / prompts.length) * 100).toFixed(1)}%)`);
  console.log(`  Green (Normal): ${classificationAnalysis.green.length} (${((classificationAnalysis.green.length / prompts.length) * 100).toFixed(1)}%)`);
  
  // Sample analysis
  console.log('\nSample Red Alerts (Critical):');
  classificationAnalysis.red.slice(0, 3).forEach(prompt => {
    console.log(`  ${prompt.id}: ${prompt.prompt} (Value: ${prompt.simulatedValue})`);
    console.log(`    Action: ${prompt.action}`);
  });
  
  console.log('\nSample Green Status (Normal):');
  classificationAnalysis.green.slice(0, 3).forEach(prompt => {
    console.log(`  ${prompt.id}: ${prompt.prompt} (Value: ${prompt.simulatedValue})`);
    console.log(`    Action: ${prompt.action}`);
  });
  
  // Generate structured output for database integration
  const structuredPrompts = prompts.map(prompt => ({
    agentType: determineAgentType(prompt),
    promptCategory: prompt.category,
    promptText: prompt.prompt,
    classification: prompt.status.toUpperCase(),
    classificationReason: generateClassificationReason(prompt),
    contextData: {
      ranges: {
        green: prompt.greenRange,
        yellow: prompt.yellowRange,
        red: prompt.redRange
      },
      simulatedValue: prompt.simulatedValue,
      suggestedAction: prompt.action,
      originalId: prompt.id
    },
    source: 'Weekly_Prompts_Unique_545',
    confidenceScore: calculateConfidenceScore(prompt)
  }));
  
  // Save processed data
  const outputPath = path.join(process.cwd(), '..', 'shared', 'processed-prompts.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    metadata: {
      totalPrompts: prompts.length,
      categories: Object.keys(categories),
      processedAt: new Date().toISOString()
    },
    prompts: structuredPrompts,
    agentMapping,
    classificationAnalysis
  }, null, 2));
  
  console.log(`\nProcessed data saved to: ${outputPath}`);
  
  return {
    totalPrompts: prompts.length,
    structuredPrompts,
    agentMapping,
    recommendations: generateRecommendations(prompts, agentMapping)
  };
}

function determineAgentType(prompt: any): string {
  if (prompt.category === 'Capacity & Routing') return 'Route_Optimization_Engine';
  if (prompt.prompt.includes('revenue') || prompt.prompt.includes('profit')) return 'Performance_Analytics_AI';
  if (prompt.prompt.includes('parts') || prompt.prompt.includes('cost')) return 'Parts_Prediction_Engine';
  if (prompt.prompt.includes('planning area')) return 'Regional_Performance_Monitor';
  return 'Performance_Analytics_AI'; // Default
}

function generateClassificationReason(prompt: any): string {
  const value = prompt.simulatedValue;
  const ranges = {
    green: prompt.greenRange,
    yellow: prompt.yellowRange,
    red: prompt.redRange
  };
  
  if (prompt.status === 'Red') {
    return `Critical deviation: Value ${value} outside acceptable range (${ranges.green}). Requires immediate intervention.`;
  } else if (prompt.status === 'Yellow') {
    return `Moderate concern: Value ${value} in warning range (${ranges.yellow}). Monitoring required.`;
  } else {
    return `Normal operations: Value ${value} within target range (${ranges.green}). Continue current approach.`;
  }
}

function calculateConfidenceScore(prompt: any): number {
  // Higher confidence for clear range violations
  const value = prompt.simulatedValue;
  
  // Extract numeric ranges for analysis
  const greenMatch = prompt.greenRange.match(/(\d+)-(\d+)/);
  if (greenMatch) {
    const [, greenMin, greenMax] = greenMatch.map(Number);
    const deviation = Math.min(Math.abs(value - greenMin), Math.abs(value - greenMax));
    
    if (value >= greenMin && value <= greenMax) return 95; // High confidence for green
    if (deviation > 20) return 90; // High confidence for clear violations
    if (deviation > 10) return 75; // Medium confidence for moderate deviations
    return 60; // Lower confidence for edge cases
  }
  
  return 80; // Default confidence
}

function generateRecommendations(prompts: any[], agentMapping: any) {
  const redCount = prompts.filter(p => p.status === 'Red').length;
  const totalCount = prompts.length;
  const criticalRate = (redCount / totalCount) * 100;
  
  return {
    systemHealth: criticalRate < 20 ? 'GOOD' : criticalRate < 40 ? 'CONCERNING' : 'CRITICAL',
    immediateActions: [
      `${redCount} critical alerts require immediate attention`,
      'Set up automated escalation for Red status prompts',
      'Implement real-time monitoring for high-impact metrics',
      'Create agent-specific alert routing based on prompt categories'
    ],
    agentOptimizations: Object.entries(agentMapping).map(([agent, mappedPrompts]: [string, any]) => ({
      agent,
      promptCount: mappedPrompts.length,
      criticalPrompts: mappedPrompts.filter((p: any) => p.status === 'Red').length,
      recommendation: mappedPrompts.filter((p: any) => p.status === 'Red').length > 0 
        ? 'High priority - implement immediate monitoring' 
        : 'Standard monitoring sufficient'
    }))
  };
}

// Run processing
processPrompts()
  .then(results => {
    console.log('\n=== INTEGRATION RECOMMENDATIONS ===');
    console.log(`System Health: ${results.recommendations.systemHealth}`);
    console.log('\nImmediate Actions:');
    results.recommendations.immediateActions.forEach(action => {
      console.log(`  • ${action}`);
    });
    console.log('\nAgent Optimizations:');
    results.recommendations.agentOptimizations.forEach(opt => {
      console.log(`  ${opt.agent}: ${opt.promptCount} prompts (${opt.criticalPrompts} critical) - ${opt.recommendation}`);
    });
  })
  .catch(console.error);