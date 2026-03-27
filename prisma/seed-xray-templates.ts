import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Laterality options for extremities
const lateralities = ['Right', 'Left', 'Bilateral'];

// Helper to generate laterality variants
function withLaterality(baseTitle: string, bodyPart: string, views: string, content: string, tags: string, description: string) {
  const templates: any[] = [];
  lateralities.forEach(lat => {
    templates.push({
      title: `${baseTitle} - ${lat}`,
      category: `X-Ray ${bodyPart}`,
      bodyPart: bodyPart,
      description: `${description} - ${lat} side`,
      modality: "X-Ray",
      tags: `${tags},${lat.toLowerCase()}`,
      content: content.replace(/\[LATERALITY\]/g, lat)
    });
  });
  return templates;
}

// Helper to create view combination templates
function withViewCombos(baseTitle: string, bodyPart: string, viewOptions: string[], content: string, tags: string, description: string) {
  const templates: any[] = [];
  
  // Single views
  viewOptions.forEach(view => {
    templates.push({
      title: `${baseTitle} - ${view}`,
      category: `X-Ray ${bodyPart}`,
      bodyPart: bodyPart,
      description: `${description} - ${view} view`,
      modality: "X-Ray",
      tags: `${tags},${view.toLowerCase()}`,
      content: content.replace(/\[VIEWS\]/g, view)
    });
  });

  // Common 2-view combinations
  if (viewOptions.length >= 2) {
    templates.push({
      title: `${baseTitle} - ${viewOptions[0]} & ${viewOptions[1]} Views`,
      category: `X-Ray ${bodyPart}`,
      bodyPart: bodyPart,
      description: `${description} - ${viewOptions[0]} and ${viewOptions[1]} views`,
      modality: "X-Ray",
      tags: `${tags},2-view`,
      content: content.replace(/\[VIEWS\]/g, `${viewOptions[0]} and ${viewOptions[1]} views`)
    });
  }

  // 3-view combinations for complex cases
  if (viewOptions.length >= 3) {
    templates.push({
      title: `${baseTitle} - ${viewOptions[0]}, ${viewOptions[1]} & ${viewOptions[2]} Views`,
      category: `X-Ray ${bodyPart}`,
      bodyPart: bodyPart,
      description: `${description} - Complete 3-view series`,
      modality: "X-Ray",
      tags: `${tags},3-view,complete`,
      content: content.replace(/\[VIEWS\]/g, `${viewOptions[0]}, ${viewOptions[1]} and ${viewOptions[2]} views`)
    });
  }

  return templates;
}

// Combine laterality with view combinations
function withLateralityAndViews(baseTitle: string, bodyPart: string, viewOptions: string[], content: string, tags: string, description: string) {
  const templates: any[] = [];
  
  lateralities.forEach(lat => {
    // Single views with laterality
    viewOptions.forEach(view => {
      templates.push({
        title: `${baseTitle} - ${lat} - ${view}`,
        category: `X-Ray ${bodyPart}`,
        bodyPart: bodyPart,
        description: `${description} - ${lat}, ${view} view`,
        modality: "X-Ray",
        tags: `${tags},${lat.toLowerCase()},${view.toLowerCase()}`,
        content: content.replace(/\[LATERALITY\]/g, lat).replace(/\[VIEWS\]/g, view)
      });
    });

    // 2-view combination with laterality
    if (viewOptions.length >= 2) {
      templates.push({
        title: `${baseTitle} - ${lat} - ${viewOptions[0]} & ${viewOptions[1]}`,
        category: `X-Ray ${bodyPart}`,
        bodyPart: bodyPart,
        description: `${description} - ${lat}, 2-view series`,
        modality: "X-Ray",
        tags: `${tags},${lat.toLowerCase()},2-view`,
        content: content.replace(/\[LATERALITY\]/g, lat).replace(/\[VIEWS\]/g, `${viewOptions[0]} and ${viewOptions[1]} views`)
      });
    }

    // 3-view combination with laterality for complex cases
    if (viewOptions.length >= 3) {
      templates.push({
        title: `${baseTitle} - ${lat} - Complete Series (${viewOptions.length} Views)`,
        category: `X-Ray ${bodyPart}`,
        bodyPart: bodyPart,
        description: `${description} - ${lat}, complete series`,
        modality: "X-Ray",
        tags: `${tags},${lat.toLowerCase()},complete`,
        content: content.replace(/\[LATERALITY\]/g, lat).replace(/\[VIEWS\]/g, `complete ${viewOptions.length}-view series`)
      });
    }
  });

  return templates;
}

const xrayTemplates: any[] = [
  // ==================== CHEST X-RAYS ====================
  // Routine Chest
  {
    title: "Chest X-Ray - PA View",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Standard PA view of chest",
    modality: "X-Ray",
    tags: "chest,pa view,routine,screening",
    content: `CHEST X-RAY (PA VIEW) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: PA view of the chest obtained in erect position.

FINDINGS:
LUNGS:
- Lung volumes: [normal/reduced]
- Lung parenchyma: [clear/abnormal]
- No focal consolidation, pleural effusion, or pneumothorax

CARDIOMEDIASTINAL:
- Cardiac silhouette: [normal size/enlarged]
- Cardiothoracic ratio: [measurement]
- Mediastinum: [normal/widened]

BONES: [intact/abnormal]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Chest X-Ray - AP View (Portable)",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "AP view for portable/bedside chest X-ray",
    modality: "X-Ray",
    tags: "chest,ap view,portable,icu,bedside",
    content: `CHEST X-RAY (AP PORTABLE) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: AP view of the chest obtained [at bedside/in ICU].

FINDINGS:
LUNGS:
- Lung parenchyma: [clear/consolidation/effusion]
- ET tube position: [above carina/appropriate/needs adjustment]
- Lines/tubes: [description]

CARDIOMEDIASTINAL:
- Cardiac silhouette: [limits obscured due to AP technique/visible findings]
- Central line: [position described]

IMPRESSION: [Primary findings]. [Line/tube positions].`
  },
  {
    title: "Chest X-Ray - PA & Lateral Views",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Standard 2-view chest series",
    modality: "X-Ray",
    tags: "chest,pa,lateral,2-view,routine",
    content: `CHEST X-RAY (PA & LATERAL) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: PA and lateral views of the chest obtained.

FINDINGS:
LUNGS:
- Lung volumes: [normal/reduced/hyperinflated]
- Parenchyma: [clear/abnormalities described]
- No consolidation, effusion, or pneumothorax

CARDIOMEDIASTINAL:
- Cardiac silhouette: [normal/enlarged]
- Cardiothoracic ratio: [value]
- Mediastinal contours: [normal/abnormal]
- Hila: [normal/abnormal]

PLEURA: [normal/effusion/thickening]

BONES/SOFT TISSUES: [normal/abnormal]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Chest X-Ray - Pediatric",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Chest X-ray for pediatric patients",
    modality: "X-Ray",
    tags: "chest,pediatric,child,infant",
    content: `PEDIATRIC CHEST X-RAY - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: [PA/AP] view of the chest obtained.

FINDINGS:
LUNGS:
- Lung volumes appropriate for age
- Parenchyma: [clear/abnormal]
- No consolidation or effusion

CARDIOMEDIASTINAL:
- Cardiac silhouette: [normal for age/enlarged]
- Thymus: [normal shadow/prominent]
- Mediastinum: [normal]

AIRWAY: [patent/deviation]

BONES: [intact]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Chest X-Ray - Expiratory View",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Expiratory view for pneumothorax detection",
    modality: "X-Ray",
    tags: "chest,expiratory,pneumothorax,trapped air",
    content: `CHEST X-RAY (EXPIRATORY VIEW) - REPORT

CLINICAL INDICATION: [Indication - suspected pneumothorax]

TECHNIQUE: Expiratory view of the chest obtained.

FINDINGS:
LUNGS:
- Pneumothorax: [present/absent]
- If present: Size [small/moderate/large], Side [right/left]
- Lung collapse: [degree]
- Trapped air: [present/absent]

IMPRESSION: [Pneumothorax status]. [Other findings].`
  },

  // Pathology-Focused Chest
  {
    title: "Chest X-Ray - Pneumonia/Infection",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Chest X-ray for infection evaluation",
    modality: "X-Ray",
    tags: "chest,pneumonia,infection,consolidation",
    content: `CHEST X-RAY - PNEUMONIA/INFECTION EVALUATION

CLINICAL INDICATION: [Indication - fever, cough, suspected pneumonia]

FINDINGS:
CONSOLIDATION:
- Location: [lobe/segment]
- Pattern: [lobar/patchy/interstitial]
- Air bronchograms: [present/absent]

PLEURAL EFFUSION: [present/absent, size]

OTHER FINDINGS:
- Cavitation: [present/absent]
- Lymphadenopathy: [present/absent]

IMPRESSION: [Consolidation location] consistent with [pneumonia/type]. [Severity assessment].`
  },
  {
    title: "Chest X-Ray - Pleural Disease",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of pleural effusion and pneumothorax",
    modality: "X-Ray",
    tags: "chest,pleural,effusion,pneumothorax",
    content: `CHEST X-RAY - PLEURAL DISEASE EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
PLEURAL EFFUSION:
- Side: [right/left/bilateral]
- Size: [small/moderate/large]
- Meniscus sign: [present]
- Layering: [on lateral decubitus if performed]

PNEUMOTHORAX:
- Present: [yes/no]
- Size: [small/moderate/large]
- Location: [apical/lateral]

PLEURAL THICKENING: [present/absent]

IMPRESSION: [Pleural findings]. [Clinical recommendation].`
  },
  {
    title: "Chest X-Ray - Interstitial Lung Disease",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation for interstitial lung changes",
    modality: "X-Ray",
    tags: "chest,ild,interstitial,fibrosis",
    content: `CHEST X-RAY - INTERSTITIAL LUNG DISEASE

CLINICAL INDICATION: [Indication]

FINDINGS:
LUNG PARENCHYMA:
- Pattern: [reticular/nodular/reticulonodular/ground glass]
- Distribution: [basal/apical/diffuse]
- Lung volumes: [normal/reduced]

FIBROSIS SIGNS:
- Honeycombing: [present/absent]
- Traction bronchiectasis: [suggested on X-ray]

CARDIAC: [normal/enlarged]

IMPRESSION: [Interstitial pattern description]. [Suggest CT chest for further evaluation].`
  },
  {
    title: "Chest X-Ray - Lung Mass/Nodule",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of lung mass or nodule",
    modality: "X-Ray",
    tags: "chest,mass,nodule,lesion,tumor",
    content: `CHEST X-RAY - LUNG MASS/NODULE

CLINICAL INDICATION: [Indication]

FINDINGS:
LESION:
- Location: [lobe, segment]
- Size: [approximate dimensions]
- Margins: [well-defined/ill-defined/spiculated]
- Calcification: [present/absent]

COMPARISON: [With prior study if available]

LYMPH NODES: Hilar [normal/enlarged], Mediastinal [normal/widened]

BONES: [metastatic lesions/normal]

IMPRESSION: [Lesion description]. [Recommend CT chest for characterization].`
  },
  {
    title: "Chest X-Ray - Cardiomegaly",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of cardiac enlargement",
    modality: "X-Ray",
    tags: "chest,cardiomegaly,heart,cardiac",
    content: `CHEST X-RAY - CARDIAC EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
CARDIAC:
- Cardiac silhouette: [normal/enlarged]
- Cardiothoracic ratio: [value] ([normal >0.5])
- Cardiac configuration: [globular/boot-shaped/other]

PULMONARY VASCULATURE:
- Vascular redistribution: [present/absent]
- Pulmonary edema: [present/absent]
- Kerley B lines: [present/absent]

PLEURAL EFFUSION: [present/absent]

IMPRESSION: [Cardiac size status]. [Signs of heart failure if present].`
  },
  {
    title: "Chest X-Ray - Pulmonary Edema",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of pulmonary edema",
    modality: "X-Ray",
    tags: "chest,edema,heart failure,fluid",
    content: `CHEST X-RAY - PULMONARY EDEMA

CLINICAL INDICATION: [Indication]

FINDINGS:
PULMONARY EDEMA:
- Severity: [mild/moderate/severe]
- Pattern: [perihilar bat-wing/diffuse/patchy]
- Airspace opacities: [bilateral]

INTERSTITIAL EDEMA:
- Kerley B lines: [present/absent]
- Peribronchial cuffing: [present/absent]

CARDIAC:
- Cardiac silhouette: [enlarged/normal]
- Vascular redistribution: [present]

PLEURAL EFFUSION: [present/absent, bilateral/right-sided]

IMPRESSION: [Pulmonary edema severity]. [Cardiac vs non-cardiac etiology].`
  },
  {
    title: "Chest X-Ray - Trauma",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Chest X-ray for trauma evaluation",
    modality: "X-Ray",
    tags: "chest,trauma,fracture,injury",
    content: `CHEST X-RAY - TRAUMA EVALUATION

CLINICAL INDICATION: [Indication - trauma]

FINDINGS:
BONES:
- Ribs: [fractures present/absent - location]
- Clavicle: [intact/fractured]
- Scapula: [intact/fractured]
- Thoracic spine: [alignment normal/abnormal]

LUNGS:
- Pneumothorax: [present/absent]
- Hemothorax: [present/absent]
- Contusion: [present/absent]

MEDIASTINUM:
- Width: [normal/widened]
- Pneumomediastinum: [present/absent]

TUBES/LINES: [position assessment]

IMPRESSION: [Traumatic findings]. [Acute abnormalities].`
  },

  // Devices and Lines
  {
    title: "Chest X-Ray - ET Tube Position",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of endotracheal tube position",
    modality: "X-Ray",
    tags: "chest,et tube,intubation,icu",
    content: `CHEST X-RAY - ET TUBE POSITION

CLINICAL INDICATION: [Indication - confirm ET tube position]

FINDINGS:
ENDOTRACHEAL TUBE:
- Tip position: [cm above carina]
- Carina distance: [ideal 2-4 cm above carina]
- Position: [appropriate/too high/too low/right mainstem]

LUNGS: [aeration status]

OTHER LINES/TUBES: [present and positions]

IMPRESSION: ET tube [appropriately positioned/needs adjustment]. [Other findings].`
  },
  {
    title: "Chest X-Ray - Central Line Position",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of central venous catheter position",
    modality: "X-Ray",
    tags: "chest,central line,cvc,icu",
    content: `CHEST X-RAY - CENTRAL LINE POSITION

CLINICAL INDICATION: [Indication - confirm CVC position]

FINDINGS:
CENTRAL VENOUS CATHETER:
- Insertion site: [right/left internal jugular/subclavian]
- Course: [described]
- Tip position: [cavoatrial junction/SVC/atrium]
- Position: [appropriate/malpositioned]

COMPLICATIONS:
- Pneumothorax: [present/absent]
- Hematoma: [present/absent]

IMPRESSION: Central line [appropriately positioned/needs repositioning].`
  },
  {
    title: "Chest X-Ray - NG Tube Position",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of nasogastric tube position",
    modality: "X-Ray",
    tags: "chest,ng tube,feeding tube",
    content: `CHEST X-RAY - NG TUBE POSITION

CLINICAL INDICATION: [Indication - confirm NG tube position]

FINDINGS:
NASOGASTRIC TUBE:
- Course: [traces expected path]
- Tip position: [stomach - body/fundus/antrum]
- Side port: [in stomach/position unclear]
- Position: [appropriate/coiled in pharynx/in bronchus]

IMPRESSION: NG tube [appropriately positioned in stomach/malpositioned].`
  },
  {
    title: "Chest X-Ray - Chest Tube/ICD",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of chest tube/ICD position",
    modality: "X-Ray",
    tags: "chest,chest tube,icd,drain,pneumothorax",
    content: `CHEST X-RAY - CHEST TUBE/ICD POSITION

CLINICAL INDICATION: [Indication - evaluate chest tube]

FINDINGS:
CHEST TUBE/ICD:
- Location: [side, approximate level]
- Tip position: [described]
- Side holes: [position relative to chest wall]

EFFECTIVENESS:
- Pneumothorax: [resolved/persistent]
- Effusion: [drained/residual]

IMPRESSION: Chest tube [appropriately positioned/needs adjustment]. [Effectiveness assessment].`
  },
  {
    title: "Chest X-Ray - Pacemaker/AICD",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Evaluation of pacemaker/AICD position",
    modality: "X-Ray",
    tags: "chest,pacemaker,aicd,device",
    content: `CHEST X-RAY - PACEMAKER/AICD EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
DEVICE:
- Generator: [location - typically left pectoral]
- Leads: [number, course described]
- Lead tips: [RA appendage, RV apex positions]

COMPLICATIONS:
- Lead fracture: [none identified/present]
- Lead displacement: [none identified/present]
- Pneumothorax: [absent/present]

IMPRESSION: Pacemaker/AICD leads [appropriately positioned/complications noted].`
  },

  // Special Views - Chest
  {
    title: "Chest X-Ray - Lateral View",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Lateral view of chest for localization",
    modality: "X-Ray",
    tags: "chest,lateral,localization",
    content: `CHEST X-RAY (LATERAL VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
LUNGS:
- Retrosternal clear space: [preserved/obscured]
- Retrocardiac region: [clear/opaque]
- Lesion localization: [described]

MEDIASTINUM: [anterior/middle/posterior compartments]

DIAPHRAGM: Right [position], Left [position]

IMPRESSION: [Findings on lateral view]. [Added value over PA].`
  },
  {
    title: "Chest X-Ray - Lordotic View",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Lordotic view for apical evaluation",
    modality: "X-Ray",
    tags: "chest,lordotic,apical,tb",
    content: `CHEST X-RAY (LORDOTIC VIEW) - REPORT

CLINICAL INDICATION: [Indication - apical pathology evaluation]

FINDINGS:
APICAL REGIONS:
- Right apex: [clear/abnormal]
- Left apex: [clear/abnormal]
- Clavicles: projected above apices

SPECIFIC EVALUATION:
- Apical scarring: [present/absent]
- Apical consolidation: [present/absent]
- Cavitation: [present/absent]

IMPRESSION: [Apical region findings].`
  },
  {
    title: "Chest X-Ray - Decubitus View",
    category: "X-Ray Chest",
    bodyPart: "Chest",
    description: "Decubitus view for effusion layering",
    modality: "X-Ray",
    tags: "chest,decubitus,effusion,layering",
    content: `CHEST X-RAY (DECUBITUS VIEW) - REPORT

CLINICAL INDICATION: [Indication - evaluate pleural effusion]

TECHNIQUE: [Right/Left] lateral decubitus view obtained.

FINDINGS:
PLEURAL EFFUSION:
- Layering: [present/absent]
- Change from upright: [description]
- Estimated volume: [ml]
- Loculation suspected: [yes/no]

IMPRESSION: [Layering effusion/loculated effusion]. [Clinical significance].`
  },

  // ==================== ABDOMEN X-RAYS ====================
  {
    title: "Abdomen X-Ray - Erect (Acute Abdomen)",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Erect abdomen for acute abdomen evaluation",
    modality: "X-Ray",
    tags: "abdomen,erect,acute abdomen,perforation",
    content: `ABDOMEN X-RAY (ERECT) - REPORT

CLINICAL INDICATION: [Indication - acute abdomen]

FINDINGS:
PNEUMOPERITONEUM:
- Free air under diaphragm: [present/absent]
- If present: Amount [small/moderate/large]

BOWEL GAS PATTERN:
- Stomach: [normal/distended]
- Small bowel: [normal/distended, air-fluid levels]
- Large bowel: [normal/distended]

CALCIFICATIONS: [present/absent, location]

IMPRESSION: [Free air/bowel obstruction/other acute findings].`
  },
  {
    title: "Abdomen X-Ray - Supine (KUB)",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Supine abdomen/KUB for general evaluation",
    modality: "X-Ray",
    tags: "abdomen,supine,kub,renal,colic",
    content: `ABDOMEN X-RAY (SUPINE/KUB) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
KIDNEYS:
- Size and position: [normal/outlined]
- Calculi: [radio-opaque stones present/absent]

URETERS: [calculi visible/none seen]

BLADDER: [distended/calcifications]

BOWEL:
- Gas pattern: [normal/abnormal]
- Obstruction: [no evidence/present]

OTHER CALCIFICATIONS: [present/absent - location]

IMPRESSION: [Primary findings]. [Calculi if present].`
  },
  {
    title: "Abdomen X-Ray - Acute Abdomen Series",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Complete acute abdomen series (erect + supine)",
    modality: "X-Ray",
    tags: "abdomen,acute abdomen,series,obstruction,perforation",
    content: `ABDOMEN X-RAY - ACUTE ABDOMEN SERIES

CLINICAL INDICATION: [Indication]

TECHNIQUE: Erect and supine views of the abdomen.

FINDINGS:
ERECT VIEW:
- Free air under diaphragm: [present/absent]
- Air-fluid levels: [present/absent, number and location]

SUPINE VIEW:
- Bowel gas pattern: [normal/distended]
- Dilated bowel: [small bowel >3cm, large bowel >6cm]
- Transition point: [identified/not seen]

OTHER:
- Soft tissue masses: [present/absent]
- Calcifications: [present/absent]

IMPRESSION: [Obstruction/perforation/other acute findings].`
  },
  {
    title: "Abdomen X-Ray - Pediatric",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Pediatric abdominal X-ray",
    modality: "X-Ray",
    tags: "abdomen,pediatric,child,infant",
    content: `PEDIATRIC ABDOMEN X-RAY - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BOWEL:
- Gas pattern: [age-appropriate/abnormal]
- Distension: [present/absent]
- Obstruction signs: [present/absent]

PNEUMOPERITONEUM: [absent/present]

CALCIFICATIONS: [absent/present]

SOFT TISSUES: [normal/abnormal]

IMPRESSION: [Primary findings]. [Suggest further imaging if needed].`
  },
  {
    title: "Abdomen X-Ray - Neonatal",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Neonatal abdominal X-ray for NEC evaluation",
    modality: "X-Ray",
    tags: "abdomen,neonatal,nec,necrotizing enterocolitis",
    content: `NEONATAL ABDOMEN X-RAY - REPORT

CLINICAL INDICATION: [Indication - NEC screen]

FINDINGS:
BOWEL:
- Gas pattern: [normal/disseminated/absent]
- Dilated loops: [present/absent]
- Pneumatosis intestinalis: [present/absent]
- Portal venous gas: [present/absent]

PNEUMOPERITONEUM: [absent/present]

OTHER: [NG tube position, umbilical lines if present]

IMPRESSION: [NEC stage if applicable]. [Acute findings].`
  },
  {
    title: "Abdomen X-Ray - Intestinal Obstruction",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Evaluation for intestinal obstruction",
    modality: "X-Ray",
    tags: "abdomen,obstruction,sbo,lbo,bowel",
    content: `ABDOMEN X-RAY - INTESTINAL OBSTRUCTION

CLINICAL INDICATION: [Indication]

FINDINGS:
SMALL BOWEL:
- Dilatation: [present/absent]
- Diameter: [cm]
- Air-fluid levels: [present, location]
- String of pearls sign: [present/absent]

LARGE BOWEL:
- Dilatation: [present/absent]
- Diameter: [cm]

TRANSITION POINT: [identified/not seen]

COLLAPSED BOWEL: [present/absent]

IMPRESSION: [SBO/LBO/No obstruction]. [Severity and likely level].`
  },
  {
    title: "Abdomen X-Ray - Perforation (Free Air)",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Evaluation for pneumoperitoneum",
    modality: "X-Ray",
    tags: "abdomen,perforation,free air,pneumoperitoneum",
    content: `ABDOMEN X-RAY - PERFORATION EVALUATION

CLINICAL INDICATION: [Indication - suspected perforation]

FINDINGS:
PNEUMOPERITONEUM:
- Free air under diaphragm: [present/absent]
- Rigler's sign: [present/absent]
- Football sign: [present/absent]
- Amount: [small/moderate/large]

BOWEL: [other findings]

IMPRESSION: [Pneumoperitoneum present/absent]. [Surgical emergency if present].`
  },
  {
    title: "Abdomen X-Ray - Renal Calculi",
    category: "X-Ray Abdomen",
    bodyPart: "Kidneys",
    description: "KUB for radio-opaque renal calculi",
    modality: "X-Ray",
    tags: "abdomen,renal,kidney stone,calculus",
    content: `ABDOMEN X-RAY (KUB) - RENAL CALCULI

CLINICAL INDICATION: [Indication - renal colic]

FINDINGS:
KIDNEYS:
- Right kidney: [outlined, calculi seen/not seen]
- Left kidney: [outlined, calculi seen/not seen]

CALCULI:
- Size: [mm]
- Location: [pelvis/calyx/ureter]

URETERIC CALCULI: [present/absent, location]

BLADDER CALCULI: [present/absent]

NOTE: Approximately 80% of renal calculi are radio-opaque.

IMPRESSION: [Radio-opaque calculi identified/No radio-opaque calculi seen]. [Suggest CT KUB for complete evaluation].`
  },
  {
    title: "Abdomen X-Ray - Decubitus View",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Decubitus view for free air or effusion",
    modality: "X-Ray",
    tags: "abdomen,decubitus,free air,effusion",
    content: `ABDOMEN X-RAY (DECUBITUS VIEW) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: [Left/Right] lateral decubitus view.

FINDINGS:
FREE AIR:
- Between liver and abdominal wall: [present/absent]
- Amount: [small/moderate]

EFFUSION: [present/absent]

OTHER: [additional findings]

IMPRESSION: [Free air/effusion status].`
  },
  {
    title: "Abdomen X-Ray - Foreign Body",
    category: "X-Ray Abdomen",
    bodyPart: "Abdomen",
    description: "Evaluation for foreign body ingestion",
    modality: "X-Ray",
    tags: "abdomen,foreign body,ingestion",
    content: `ABDOMEN X-RAY - FOREIGN BODY

CLINICAL INDICATION: [Indication - suspected foreign body ingestion]

FINDINGS:
FOREIGN BODY:
- Present: [yes/no]
- Location: [esophagus/stomach/small bowel/large bowel]
- Size: [dimensions]
- Type: [radio-opaque description]

COMPLICATIONS:
- Obstruction: [present/absent]
- Perforation: [present/absent]

IMPRESSION: [Foreign body location]. [Recommendations for management].`
  },

  // ==================== SPINE X-RAYS ====================
  // Cervical Spine
  {
    title: "Cervical Spine X-Ray - AP View",
    category: "X-Ray Spine",
    bodyPart: "Cervical Spine",
    description: "AP view of cervical spine",
    modality: "X-Ray",
    tags: "cervical spine,ap view,neck,c-spine",
    content: `CERVICAL SPINE X-RAY (AP VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT: [normal/abnormal]

VERTEBRAE (C3-C7):
- Vertebral bodies: [normal height, alignment]
- Disc spaces: [maintained/narrowed]
- Uncovertebral joints: [normal/hypertrophy]

SPINOUS PROCESSES: [aligned/misaligned]

SOFT TISSUES: [normal/swelling]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Cervical Spine X-Ray - Lateral View",
    category: "X-Ray Spine",
    bodyPart: "Cervical Spine",
    description: "Lateral view of cervical spine",
    modality: "X-Ray",
    tags: "cervical spine,lateral view,neck,c-spine",
    content: `CERVICAL SPINE X-RAY (LATERAL VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT:
- Lordosis: [maintained/lost/reversed]
- Anterior vertebral line: [smooth/abnormal]
- Posterior vertebral line: [smooth/abnormal]
- Spinolaminar line: [smooth/abnormal]

VERTEBRAE (C1-C7):
- C1 (Atlas): [normal]
- C2 (Axis): [normal, odontoid seen]
- C3-C7 bodies: [normal height, no compression]

DISC SPACES: [maintained/narrowed at levels]

PREVERTEBRAL SOFT TISSUE: [normal/widened]

IMPRESSION: [Alignment status]. [Fracture/degenerative findings].`
  },
  {
    title: "Cervical Spine X-Ray - AP, Lateral & Open Mouth",
    category: "X-Ray Spine",
    bodyPart: "Cervical Spine",
    description: "Complete 3-view cervical spine series",
    modality: "X-Ray",
    tags: "cervical spine,3-view,complete,series,c-spine",
    content: `CERVICAL SPINE X-RAY (3-VIEW SERIES) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: AP, lateral, and open-mouth (odontoid) views obtained.

FINDINGS:
LATERAL VIEW:
- Alignment: [normal/abnormal]
- Lordosis: [preserved/loss/reversed]
- Vertebral bodies: [normal/compression]
- Disc spaces: [maintained/narrowed]
- Prevertebral soft tissue: [normal]

OPEN MOUTH VIEW:
- Odontoid process: [intact/fracture]
- C1-C2 articulation: [normal/widened]
- Lateral masses: [symmetric/asymmetric]

AP VIEW:
- Alignment: [normal]
- Spinous processes: [midline]

IMPRESSION: [Complete evaluation]. [Any acute findings].`
  },
  {
    title: "Cervical Spine X-Ray - Trauma Protocol",
    category: "X-Ray Spine",
    bodyPart: "Cervical Spine",
    description: "Cervical spine X-ray for trauma evaluation",
    modality: "X-Ray",
    tags: "cervical spine,trauma,fracture,clearance,c-spine",
    content: `CERVICAL SPINE X-RAY - TRAUMA PROTOCOL

CLINICAL INDICATION: [Indication - cervical spine trauma]

FINDINGS:
ALIGNMENT:
- All 3 contour lines: [intact/disrupted]

VERTEBRAE:
- C1: [normal/fracture]
- C2 (odontoid): [normal/fracture type]
- C3-C7: [normal/compression fracture/teardrop]

SOFT TISSUES:
- Prevertebral swelling: [present/absent]
- At C2: [normal <7mm]
- At C6: [normal <22mm]

OTHER SIGNS:
- Fanned spinous processes: [present/absent]
- Widened facet joints: [present/absent]

IMPRESSION: [Cervical spine clearance status]. [Any acute abnormality].`
  },
  {
    title: "Cervical Spine X-Ray - Flexion/Extension Views",
    category: "X-Ray Spine",
    bodyPart: "Cervical Spine",
    description: "Dynamic views for instability assessment",
    modality: "X-Ray",
    tags: "cervical spine,flexion,extension,dynamic,instability",
    content: `CERVICAL SPINE X-RAY - FLEXION/EXTENSION VIEWS

CLINICAL INDICATION: [Indication - assess instability]

TECHNIQUE: Active flexion and extension lateral views obtained.

FINDINGS:
FLEXION VIEW:
- Alignment: [maintained/abnormal]
- Translation: [normal/abnormal at level]

EXTENSION VIEW:
- Alignment: [maintained/abnormal]

INSTABILITY SIGNS:
- Anterior translation: [present/absent, mm]
- Angulation: [present/absent, degrees]

COMPARISON: [Changes between flexion and extension]

IMPRESSION: [Stability assessment]. [Abnormal motion if present].`
  },
  {
    title: "Cervical Spine X-Ray - Degenerative Changes",
    category: "X-Ray Spine",
    bodyPart: "Cervical Spine",
    description: "Evaluation for cervical spondylosis",
    modality: "X-Ray",
    tags: "cervical spine,degenerative,spondylosis,disc disease",
    content: `CERVICAL SPINE X-RAY - DEGENERATIVE DISEASE

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT: [lordosis maintained/loss/reversed]

DISC SPACE NARROWING:
- Level(s) affected: [C3-C4/C4-C5/C5-C6/C6-C7]
- Severity: [mild/moderate/severe]

OSTEOPHYTES:
- Anterior: [present/absent]
- Posterior: [present/absent]
- Uncinate: [hypertrophy present]

FACET JOINTS: [normal/hypertrophy]

FORAMINAL NARROWING: [suggested on oblique views]

IMPRESSION: [Degenerative changes at level(s)]. [Severity].`
  },

  // Dorsal/Thoracic Spine
  {
    title: "Thoracic Spine X-Ray - AP & Lateral",
    category: "X-Ray Spine",
    bodyPart: "Thoracic Spine",
    description: "Standard 2-view thoracic spine series",
    modality: "X-Ray",
    tags: "thoracic spine,dorsal spine,t-spine,ap,lateral",
    content: `THORACIC SPINE X-RAY (AP & LATERAL) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT:
- Kyphosis: [normal/increased/reversed]
- Scoliosis: [present/absent, direction]

VERTEBRAE (T1-T12):
- Vertebral body heights: [maintained/compression]
- Cortices: [intact]

DISC SPACES: [maintained/narrowed]

PARASPINAL SOFT TISSUES: [normal/widened]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Thoracic Spine X-Ray - Compression Fracture",
    category: "X-Ray Spine",
    bodyPart: "Thoracic Spine",
    description: "Evaluation for compression fracture",
    modality: "X-Ray",
    tags: "thoracic spine,compression,fracture,osteoporotic",
    content: `THORACIC SPINE X-RAY - COMPRESSION FRACTURE

CLINICAL INDICATION: [Indication]

FINDINGS:
COMPRESSION FRACTURE:
- Level: [T__]
- Wedge deformity: [anterior height loss percentage]
- Retropulsion: [present/absent]

BONE DENSITY:
- Osteopenia: [suggested/normal]

OTHER VERTEBRAE: [additional fractures]

SOFT TISSUES: [paraspinal widening if acute]

IMPRESSION: [Compression fracture at level]. [Percentage height loss]. [Acute vs chronic].`
  },
  {
    title: "Thoracic Spine X-Ray - Kyphosis Assessment",
    category: "X-Ray Spine",
    bodyPart: "Thoracic Spine",
    description: "Evaluation of thoracic kyphosis",
    modality: "X-Ray",
    tags: "thoracic spine,kyphosis,deformity,scheuermann",
    content: `THORACIC SPINE X-RAY - KYPHOSIS ASSESSMENT

CLINICAL INDICATION: [Indication]

FINDINGS:
KYPHOSIS:
- Cobb angle: [degrees]
- Normal range: 20-50 degrees
- Apex: [T__]

VERTEBRAL CHANGES:
- Wedging: [present/absent at levels]
- Schmorl nodes: [present/absent]
- End plate irregularity: [present/absent]

SCHEUERMANN'S CRITERIA: [met/not met]

IMPRESSION: [Kyphosis angle]. [Scheuermann's disease status].`
  },

  // Lumbar Spine
  {
    title: "Lumbar Spine X-Ray - AP View",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "AP view of lumbar spine",
    modality: "X-Ray",
    tags: "lumbar spine,ap view,lower back,l-spine",
    content: `LUMBAR SPINE X-RAY (AP VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT: [normal/scoliosis]

VERTEBRAE (L1-L5):
- Vertebral bodies: [normal height]
- Pedicles: [visible, symmetric]
- Transverse processes: [intact]
- Spinous processes: [midline]

DISC SPACES: [maintained/narrowed at levels]

SACROILIAC JOINTS: [normal/sclerosis/fusion]

Psoas shadows: [symmetric/obliterated]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Lumbar Spine X-Ray - Lateral View",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "Lateral view of lumbar spine",
    modality: "X-Ray",
    tags: "lumbar spine,lateral view,lower back,l-spine",
    content: `LUMBAR SPINE X-RAY (LATERAL VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT:
- Lordosis: [maintained/loss/reversed]

VERTEBRAE:
- Body heights: [maintained/compression]
- End plates: [smooth/irregular]

DISC SPACES:
- L1-L2: [maintained]
- L2-L3: [maintained]
- L3-L4: [maintained]
- L4-L5: [maintained]
- L5-S1: [maintained]

SPONDYLOLISTHESIS: [present/absent at level, grade]

IMPRESSION: [Primary findings].`
  },
  {
    title: "Lumbar Spine X-Ray - AP & Lateral Views",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "Standard 2-view lumbar spine series",
    modality: "X-Ray",
    tags: "lumbar spine,ap,lateral,2-view,l-spine",
    content: `LUMBAR SPINE X-RAY (AP & LATERAL) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ALIGNMENT:
- Lordosis: [maintained/loss]
- Scoliosis: [present/absent]

VERTEBRAE:
- Body heights: [maintained/compression]
- Pedicles: [intact]

DISC SPACES:
- [Level: maintained/narrowed]
- [Level: maintained/narrowed]

FACET JOINTS: [normal/hypertrophy]

SPONDYLOLISTHESIS: [present/absent, level, grade]

SACROILIAC JOINTS: [normal/abnormal]

IMPRESSION: [Degenerative changes]. [Disc disease]. [Spondylolisthesis if present].`
  },
  {
    title: "Lumbar Spine X-Ray - Oblique Views (Pars Defect)",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "Oblique views for pars interarticularis evaluation",
    modality: "X-Ray",
    tags: "lumbar spine,oblique,pars defect,spondylolysis,scotty dog",
    content: `LUMBAR SPINE X-RAY (OBLIQUE VIEWS) - REPORT

CLINICAL INDICATION: [Indication - pars defect/spondylolysis]

FINDINGS:
SCOTTY DOG SIGN:
- Right oblique: [intact collar/broken collar at level]
- Left oblique: [intact collar/broken collar at level]

PARS INTERARTICULARIS:
- L4: [intact/defect]
- L5: [intact/defect]

SPONDYLOLYSIS: [present/absent at level, side]

IMPRESSION: [Spondylolysis status]. [Level and side if present].`
  },
  {
    title: "Lumbar Spine X-Ray - Degenerative Disease",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "Evaluation for lumbar spondylosis",
    modality: "X-Ray",
    tags: "lumbar spine,degenerative,spondylosis,disc disease,oa",
    content: `LUMBAR SPINE X-RAY - DEGENERATIVE DISEASE

CLINICAL INDICATION: [Indication]

FINDINGS:
DISC SPACE:
- Narrowed levels: [specify]
- Severity: [mild/moderate/severe]

OSTEOPHYTES:
- Anterior: [present at levels]
- Posterior: [present at levels]

FACET ARTHROPATHY:
- Levels affected: [specify]
- Severity: [mild/moderate/severe]

SPONDYLOLISTHESIS: [present/absent, level, grade]

FORAMINAL NARROWING: [suggested at level]

IMPRESSION: [Degenerative changes at level(s)]. [Spondylolisthesis if present].`
  },
  {
    title: "Lumbar Spine X-Ray - Spondylolisthesis",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "Evaluation for spondylolisthesis",
    modality: "X-Ray",
    tags: "lumbar spine,spondylolisthesis,slip,grade",
    content: `LUMBAR SPINE X-RAY - SPONDYLOLISTHESIS

CLINICAL INDICATION: [Indication]

FINDINGS:
SPONDYLOLISTHESIS:
- Level: [L__ on L__]
- Grade: [I/II/III/IV/V]
- Percentage slip: [__%]

Meyerding Classification:
- Grade I: 0-25%
- Grade II: 26-50%
- Grade III: 51-75%
- Grade IV: 76-100%
- Grade V: >100% (spondyloptosis)

ASSOCIATED FINDINGS:
- Pars defect: [present/absent]
- Disc narrowing: [present at level]

IMPRESSION: [Spondylolisthesis grade] at [level]. [Isthmic vs degenerative type].`
  },
  {
    title: "Lumbar Spine X-Ray - Trauma",
    category: "X-Ray Spine",
    bodyPart: "Lumbar Spine",
    description: "Lumbar spine for trauma evaluation",
    modality: "X-Ray",
    tags: "lumbar spine,trauma,fracture,injury,l-spine",
    content: `LUMBAR SPINE X-RAY - TRAUMA

CLINICAL INDICATION: [Indication - trauma]

FINDINGS:
ALIGNMENT: [normal/abnormal]

VERTEBRAE:
- Compression: [present/absent, level, height loss %]
- Burst fracture: [present/absent, retropulsion]
- Transverse process fracture: [present/absent]

DISC SPACES: [maintained/widened/narrowed]

PARASPINAL SOFT TISSUES: [normal/widened]

IMPRESSION: [Fracture status]. [Stability assessment].`
  },

  // Whole Spine
  {
    title: "Whole Spine X-Ray - Scoliosis AP",
    category: "X-Ray Spine",
    bodyPart: "Whole Spine",
    description: "Full spine AP for scoliosis evaluation",
    modality: "X-Ray",
    tags: "scoliosis,whole spine,spine,cobb angle",
    content: `WHOLE SPINE X-RAY (SCOLIOSIS AP) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
SCOLIOSIS:
- Primary curve: [thoracic/thoracolumbar/lumbar]
- Convexity: [right/left]
- Cobb angle: [__ degrees]
- Apical vertebra: [__]
- End vertebrae: [__ to __]

SECONDARY CURVES: [describe if present]

VERTEBRAL ANOMALIES: [present/absent]

PELVIS: [Risser sign for skeletal maturity]

IMPRESSION: [Scoliosis type]. [Cobb angle]. [Follow-up recommendation].`
  },
  {
    title: "Whole Spine X-Ray - Scoliosis Series (AP & Lateral)",
    category: "X-Ray Spine",
    bodyPart: "Whole Spine",
    description: "Complete scoliosis series",
    modality: "X-Ray",
    tags: "scoliosis,whole spine,series,cobb angle",
    content: `WHOLE SPINE X-RAY - SCOLIOSIS SERIES

CLINICAL INDICATION: [Indication]

TECHNIQUE: Full spine AP and lateral views.

FINDINGS:
AP VIEW:
- Primary curve: [location, convexity]
- Cobb angle: [__ degrees]
- Secondary curves: [describe]

LATERAL VIEW:
- Thoracic kyphosis: [normal/increased/decreased]
- Lumbar lordosis: [normal/increased/decreased]
- Sagittal balance: [described]

VERTEBRAL ANOMALIES: [present/absent]

SKELETAL MATURITY: [Risser stage]

IMPRESSION: [Idiopathic/congenital/neuromuscular scoliosis]. [Curve measurements]. [Progression risk].`
  },

  // ==================== UPPER LIMB X-RAYS ====================
  // Shoulder - with laterality and view combinations
  ...withLateralityAndViews(
    "X-Ray Shoulder",
    "Shoulder",
    ["AP", "Axillary", "Y-View (Scapular)"],
    `X-RAY SHOULDER ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Humeral head: [normal/fracture/lesions]
- Glenoid: [normal/fracture]
- Acromion: [normal]
- Clavicle: [normal]
- Scapula: [normal]

JOINT SPACE:
- GH joint: [maintained/narrowed]
- AC joint: [normal/widened/arthritis]

ALIGNMENT:
- Humeral head position: [normal/anterior dislocation/posterior dislocation]

SOFT TISSUES: [normal/swelling]

IMPRESSION: [Primary findings]. [Dislocation if present].`,
    "shoulder,upper limb,joint,fracture",
    "X-ray of shoulder joint"
  ),
  {
    title: "X-Ray Shoulder - AP View (Bilateral Comparison)",
    category: "X-Ray Shoulder",
    bodyPart: "Shoulder",
    description: "Bilateral shoulder AP for comparison",
    modality: "X-Ray",
    tags: "shoulder,bilateral,comparison,ap view",
    content: `X-RAY SHOULDERS (BILATERAL AP) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
RIGHT SHOULDER:
- GH joint: [normal/abnormal]
- AC joint: [normal/abnormal]
- Humeral head: [normal/abnormal]

LEFT SHOULDER:
- GH joint: [normal/abnormal]
- AC joint: [normal/abnormal]
- Humeral head: [normal/abnormal]

COMPARISON: [Asymmetric findings described]

IMPRESSION: [Bilateral findings]. [Side-specific pathology].`
  },
  {
    title: "X-Ray Shoulder - Dislocation Evaluation",
    category: "X-Ray Shoulder",
    bodyPart: "Shoulder",
    description: "Shoulder X-ray for dislocation assessment",
    modality: "X-Ray",
    tags: "shoulder,dislocation,anterior,posterior",
    content: `X-RAY SHOULDER - DISLOCATION EVALUATION

CLINICAL INDICATION: [Indication - suspected dislocation]

FINDINGS:
GH JOINT:
- Humeral head position: [normal/anterior to glenoid/posterior to glenoid]
- Hill-Sachs lesion: [present/absent]
- Bony Bankart: [present/absent]

DISLOCATION TYPE:
- Anterior: [yes/no] - humeral head anterior/inferior to glenoid
- Posterior: [yes/no] - humeral head posterior to glenoid, "lightbulb" sign

FRACTURES: [present/absent]

IMPRESSION: [Dislocation type if present]. [Associated fractures].`
  },
  {
    title: "X-Ray Shoulder - AC Joint Injury",
    category: "X-Ray Shoulder",
    bodyPart: "Shoulder",
    description: "AC joint injury evaluation",
    modality: "X-Ray",
    tags: "shoulder,ac joint,separation,acromioclavicular",
    content: `X-RAY SHOULDER - AC JOINT EVALUATION

CLINICAL INDICATION: [Indication - AC joint injury]

FINDINGS:
AC JOINT:
- Width: [normal 3-7mm / widened]
- Coracoclavicular distance: [normal 11-13mm / increased]
- Clavicle position: [normal/elevated]

CLASSIFICATION (Rockwood):
- Type I: [sprain, normal X-ray]
- Type II: [AC widening, CC intact]
- Type III: [AC + CC widening, clavicle elevated 100%]
- Type IV-VI: [describe]

COMPARISON VIEW: [weighted views if obtained]

IMPRESSION: [AC joint injury type]. [Grade].`
  },

  // Humerus - with laterality
  ...withLateralityAndViews(
    "X-Ray Humerus",
    "Upper Extremity",
    ["AP", "Lateral"],
    `X-RAY HUMERUS ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONE:
- Humeral shaft: [intact/fracture]
- Fracture location: [proximal/mid-shaft/distal]
- Fracture pattern: [transverse/spiral/oblique/comminuted]
- Displacement: [none/minimal/moderate]

JOINTS:
- Shoulder joint: [visible portion normal/abnormal]
- Elbow joint: [visible portion normal/abnormal]

SOFT TISSUES: [normal/swelling]

IMPRESSION: [Fracture description if present]. [Displacement/angulation].`,
    "humerus,upper arm,fracture,long bone",
    "X-ray of humerus"
  ),

  // Elbow - with laterality
  ...withLateralityAndViews(
    "X-Ray Elbow",
    "Elbow",
    ["AP", "Lateral", "Radial Head View"],
    `X-RAY ELBOW ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Distal humerus: [normal/fracture]
- Radius: [normal/fracture - radial head/neck]
- Ulna: [normal/fracture - olecranon/coronoid]

JOINT:
- Joint space: [normal/widened/narrowed]
- Effusion: [present/absent]
- Fat pad sign: [positive/negative]

ALIGNMENT:
- Anterior humeral line: [normal/abnormal]
- Radiocapitellar line: [normal/abnormal]

FRACTURES: [description]

IMPRESSION: [Primary findings]. [Fat pad sign]. [Fracture if present].`,
    "elbow,joint,fracture,upper limb",
    "X-ray of elbow joint"
  ),
  {
    title: "X-Ray Elbow - Pediatric (Ossification Centers)",
    category: "X-Ray Elbow",
    bodyPart: "Elbow",
    description: "Pediatric elbow with ossification center assessment",
    modality: "X-Ray",
    tags: "elbow,pediatric,child,ossification,supracondylar",
    content: `PEDIATRIC ELBOW X-RAY - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
OSSIFICATION CENTERS (CRITOE):
- Capitellum: [present/absent] - appears ~1 year
- Radial head: [present/absent] - appears ~3-5 years
- Internal (medial) epicondyle: [present/absent] - appears ~5-7 years
- Trochlea: [present/absent] - appears ~7-9 years
- Olecranon: [present/absent] - appears ~8-10 years
- External (lateral) epicondyle: [present/absent] - appears ~10-12 years

ALIGNMENT:
- Anterior humeral line: [intersects capitellum/abnormal]
- Radiocapitellar line: [passes through capitellum/abnormal]

FRACTURES:
- Supracondylar: [present/absent, type]
- Lateral condyle: [present/absent]
- Medial epicondyle: [present/absent, avulsion]

EFFUSION: [fat pad sign positive/negative]

IMPRESSION: [Fracture status]. [Alignment assessment].`
  },

  // Forearm - with laterality
  ...withLateralityAndViews(
    "X-Ray Forearm",
    "Upper Extremity",
    ["AP", "Lateral"],
    `X-RAY FOREARM ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Radius: [intact/fracture - location, pattern]
- Ulna: [intact/fracture - location, pattern]

BOTH-BONES FRACTURE:
- Present: [yes/no]
- Level: [proximal/mid/distal]
- Displacement: [degrees, translation]

JOINTS:
- Elbow: [visible portion normal/abnormal]
- Wrist: [visible portion normal/abnormal]

INTEROSSEOUS SPACE: [maintained/widened]

IMPRESSION: [Fracture description]. [Both-bones injury]. [Displacement].`,
    "forearm,radius,ulna,both bones,fracture",
    "X-ray of forearm"
  ),

  // Wrist - with laterality
  ...withLateralityAndViews(
    "X-Ray Wrist",
    "Wrist/Hand",
    ["AP", "Lateral", "Oblique", "Scaphoid View"],
    `X-RAY WRIST ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Distal radius: [normal/fracture]
- Distal ulna: [normal/fracture]
- Carpal bones: [normal/fracture - specify]
- Scaphoid: [normal/fracture/suspected]

JOINT SPACES:
- Radiocarpal: [maintained]
- Intercarpal: [maintained]

ALIGNMENT:
- Radial inclination: [normal ~22 degrees]
- Radial height: [normal ~11mm]
- Volar tilt: [normal ~11 degrees volar]

CARPAL ALIGNMENT:
- Gilula's arcs: [intact/disrupted]

SOFT TISSUES: [normal/swelling]

IMPRESSION: [Fracture status]. [Carpal alignment].`,
    "wrist,carpal,fracture,colles,scaphoid",
    "X-ray of wrist"
  ),
  {
    title: "X-Ray Wrist - Distal Radius Fracture (Colles/Smith)",
    category: "X-Ray Wrist/Hand",
    bodyPart: "Wrist/Hand",
    description: "Evaluation of distal radius fractures",
    modality: "X-Ray",
    tags: "wrist,colles,smith,distal radius,fracture",
    content: `X-RAY WRIST - DISTAL RADIUS FRACTURE

CLINICAL INDICATION: [Indication - wrist trauma]

FINDINGS:
DISTAL RADIUS FRACTURE:
- Location: [extra-articular/intra-articular]
- Pattern: [transverse/comminuted]

DEFORMITY:
- Dorsal angulation (Colles): [present/absent, degrees]
- Volar angulation (Smith): [present/absent, degrees]
- Radial shortening: [mm]

ARTICULAR SURFACE:
- Step-off: [present/absent, mm]
- Gap: [present/absent, mm]

ASSOCIATED FINDINGS:
- Ulnar styloid fracture: [present/absent]
- DRUJ involvement: [likely/unlikely]

CLASSIFICATION: [Frykman/Universal/AO]

IMPRESSION: [Fracture type - Colles/Smith/Barton]. [Displacement]. [Articular involvement].`
  },
  {
    title: "X-Ray Wrist - Scaphoid Fracture",
    category: "X-Ray Wrist/Hand",
    bodyPart: "Wrist/Hand",
    description: "Scaphoid view for scaphoid fracture",
    modality: "X-Ray",
    tags: "wrist,scaphoid,fracture,navicular",
    content: `X-RAY WRIST - SCAPHOID SERIES

CLINICAL INDICATION: [Indication - snuffbox tenderness]

FINDINGS:
SCAPHOID:
- Fracture visible: [yes/no]
- If present:
  - Location: [waist/proximal pole/distal pole]
  - Displacement: [none/minimal/significant]
  - Step-off: [mm]

SCAPHOID FAT STRIP: [displaced/normal]

OTHER CARPALS: [normal/abnormal]

IMPRESSION: [Scaphoid fracture visible/No fracture seen]. [Recommend repeat X-ray or MRI in 10-14 days if clinical suspicion high].`
  },

  // Hand - with laterality
  ...withLateralityAndViews(
    "X-Ray Hand",
    "Wrist/Hand",
    ["AP", "Oblique", "Lateral"],
    `X-RAY HAND ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Metacarpals (1-5): [normal/fracture - specify]
- Phalanges: [normal/fracture - specify]
- Sesamoids: [normal]

JOINT SPACES:
- MCP joints: [maintained/narrowed]
- PIP joints: [maintained/narrowed]
- DIP joints: [maintained/narrowed]

ALIGNMENT: [normal/malrotation/angulation]

SOFT TISSUES: [normal/swelling/foreign body]

IMPRESSION: [Fracture description]. [Displacement]. [Arthritic changes].`,
    "hand,metacarpal,phalanx,fracture",
    "X-ray of hand"
  ),
  {
    title: "X-Ray Hand - Fracture/Dislocation",
    category: "X-Ray Wrist/Hand",
    bodyPart: "Wrist/Hand",
    description: "Hand X-ray for trauma evaluation",
    modality: "X-Ray",
    tags: "hand,fracture,dislocation,trauma",
    content: `X-RAY HAND - TRAUMA EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
FRACTURES:
- Bone: [metacarpal/phalanx - specify which]
- Location: [base/shaft/neck/head]
- Pattern: [transverse/spiral/oblique/comminuted]
- Intra-articular: [yes/no]

DISLOCATION:
- Joint: [specify - MCP/PIP/DIP/CMC]
- Direction: [dorsal/volar/lateral]

ALIGNMENT:
- Rotation: [normal/malrotated]
- Angulation: [degrees]

SOFT TISSUES: [swelling present]

IMPRESSION: [Fracture/dislocation description]. [Displacement]. [Treatment considerations].`
  },
  {
    title: "X-Ray Hand - Arthritis Evaluation",
    category: "X-Ray Wrist/Hand",
    bodyPart: "Wrist/Hand",
    description: "Hand X-ray for arthritis assessment",
    modality: "X-Ray",
    tags: "hand,arthritis,oa,ra,joint",
    content: `X-RAY HAND - ARTHRITIS EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
JOINT SPACES:
- MCP joints: [normal/narrowed - which]
- PIP joints: [normal/narrowed - which]
- DIP joints: [normal/narrowed - which]
- First CMC: [normal/narrowed]

EROSIONS: [present/absent, location]

OSTEOPHYTES: [present/absent, location]

SOFT TISSUE SWELLING: [present/absent]

PATTERN:
- OA: DIP, PIP, first CMC involvement, osteophytes
- RA: MCP, PIP, erosions, periarticular osteopenia
- Psoriatic: DIP, pencil-in-cup, acro-osteolysis

IMPRESSION: [Arthritis pattern]. [Distribution]. [Severity].`
  },

  // ==================== LOWER LIMB X-RAYS ====================
  // Pelvis
  {
    title: "X-Ray Pelvis - AP View",
    category: "X-Ray Pelvis",
    bodyPart: "Pelvis",
    description: "AP view of pelvis",
    modality: "X-Ray",
    tags: "pelvis,pelvic,hip,ap view",
    content: `X-RAY PELVIS (AP) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Iliac wings: [intact/fracture]
- Ischium: [intact/fracture]
- Pubic rami: [intact/fracture]
- Sacrum: [visible portion normal/abnormal]
- Femoral heads: [normal/abnormal]
- Acetabula: [intact/fracture]

JOINTS:
- Hip joints: [maintained/narrowed]
- SI joints: [normal/widened/sclerotic/fused]

ALIGNMENT:
- Pubic symphysis: [aligned/widened/overlapping]

SOFT TISSUES: [normal]

IMPRESSION: [Primary findings]. [Fractures if present].`
  },
  {
    title: "X-Ray Pelvis - Trauma",
    category: "X-Ray Pelvis",
    bodyPart: "Pelvis",
    description: "Pelvic X-ray for trauma evaluation",
    modality: "X-Ray",
    tags: "pelvis,trauma,fracture,pelvic ring",
    content: `X-RAY PELVIS - TRAUMA EVALUATION

CLINICAL INDICATION: [Indication - pelvic trauma]

FINDINGS:
PELVIC RING:
- Pubic rami fractures: [present/absent - superior/inferior]
- Pubic symphysis: [normal/widened >10mm]
- SI joints: [normal/widened]
- Iliac wing: [intact/fracture]

ACETABULUM:
- Anterior column: [intact/fracture]
- Posterior column: [intact/fracture]
- Acetabular wall: [intact/fracture]

PELVIC RING STABILITY:
- Stable: [single break in ring]
- Unstable: [two breaks, pelvic widening]

CLASSIFICATION: [Young-Burgess/Tile]

IMPRESSION: [Pelvic fracture pattern]. [Stability assessment]. [CT recommended for complete evaluation].`
  },
  {
    title: "X-Ray Pelvis - Inlet/Outlet Views",
    category: "X-Ray Pelvis",
    bodyPart: "Pelvis",
    description: "Inlet and outlet views for pelvic fractures",
    modality: "X-Ray",
    tags: "pelvis,inlet,outlet,fracture",
    content: `X-RAY PELVIS - INLET/OUTLET VIEWS

CLINICAL INDICATION: [Indication - pelvic fracture]

FINDINGS:
INLET VIEW:
- Pelvic ring continuity: [assessment]
- Anterior-posterior displacement: [described]
- Internal/external rotation: [described]

OUTLET VIEW:
- Superior-inferior displacement: [described]
- Vertical instability: [present/absent]

COMBINED ASSESSMENT: [3D displacement description]

IMPRESSION: [Displacement description]. [Stability assessment].`
  },

  // Hip - with laterality
  ...withLateralityAndViews(
    "X-Ray Hip",
    "Hip",
    ["AP", "Frog-Leg Lateral"],
    `X-RAY HIP ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Femoral head: [normal/AVN/arthritic]
- Femoral neck: [intact/fracture]
- Greater trochanter: [intact/fracture]
- Lesser trochanter: [intact/fracture]
- Acetabulum: [normal/wear]

JOINT SPACE:
- Superior: [maintained/narrowed]
- Medial: [maintained/narrowed]

ALIGNMENT:
- Center-edge angle: [degrees]
- Neck-shaft angle: [degrees]

SOFT TISSUES: [normal]

IMPRESSION: [Primary findings]. [Fracture/arthritic changes].`,
    "hip,femoral,fracture,avn,arthritis",
    "X-ray of hip joint"
  ),
  {
    title: "X-Ray Hip - Femoral Neck Fracture",
    category: "X-Ray Hip",
    bodyPart: "Hip",
    description: "Hip X-ray for femoral neck fracture",
    modality: "X-Ray",
    tags: "hip,femoral neck,fracture,intertrochanteric",
    content: `X-RAY HIP - FEMORAL NECK FRACTURE

CLINICAL INDICATION: [Indication - fall, hip pain]

FINDINGS:
FRACTURE LOCATION:
- Femoral neck: [present/absent]
- Basicervical: [present/absent]
- Intertrochanteric: [present/absent]
- Subtrochanteric: [present/absent]

FEMORAL NECK FRACTURE:
- Garden classification: [I/II/III/IV]
- Displacement: [non-displaced/displaced]
- Angle: [valgus/varus]

INTERTROCHANTERIC:
- Number of fragments: [2/3/4/part]
- Stability: [stable/unstable]

IMPRESSION: [Fracture type and location]. [Classification]. [Displacement].`
  },
  {
    title: "X-Ray Hip - AVN Evaluation",
    category: "X-Ray Hip",
    bodyPart: "Hip",
    description: "Hip X-ray for avascular necrosis",
    modality: "X-Ray",
    tags: "hip,avn,avascular necrosis,osteonecrosis",
    content: `X-RAY HIP - AVN EVALUATION

CLINICAL INDICATION: [Indication - AVN screen]

FINDINGS:
FEMORAL HEAD:
- Shape: [normal/flattened/collapsed]
- Sclerosis: [present/absent - subchondral]
- Crescent sign: [present/absent]
- Cystic changes: [present/absent]

JOINT SPACE: [maintained/narrowed]

FICAT STAGING:
- Stage 0: [normal X-ray]
- Stage I: [normal X-ray, positive MRI]
- Stage II: [sclerotic/cystic changes, no collapse]
- Stage III: [crescent sign, subchondral collapse]
- Stage IV: [joint space narrowing, OA changes]

IMPRESSION: [AVN stage]. [Recommend MRI if early stage suspected].`
  },
  {
    title: "X-Ray Hip - Pediatric (DDH)",
    category: "X-Ray Hip",
    bodyPart: "Hip",
    description: "Pediatric hip for developmental dysplasia",
    modality: "X-Ray",
    tags: "hip,pediatric,ddh,developmental dysplasia,child",
    content: `PEDIATRIC HIP X-RAY - DDH EVALUATION

CLINICAL INDICATION: [Indication - DDH screen]

FINDINGS:
ACETABULAR INDEX:
- Right: [degrees]
- Left: [degrees]
- Normal: <25 degrees at 1 year

CENTER-EDGE ANGLE: [if ossified femoral head]

SHENTON'S LINE: [intact/disrupted]

FEMORAL HEAD POSITION:
- Ossification: [present/absent - delayed]
- Position relative to acetabulum: [normal/subluxed/dislocated]

PERKINS' LINE: [femoral head position relative to this line]

IMPRESSION: [DDH status]. [Acetabular dysplasia if present]. [Follow-up recommendation].`
  },

  // Femur - with laterality
  ...withLateralityAndViews(
    "X-Ray Femur",
    "Lower Extremity",
    ["AP", "Lateral"],
    `X-RAY FEMUR ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONE:
- Femoral shaft: [intact/fracture]
- Fracture location: [proximal/mid-shaft/distal]
- Fracture pattern: [transverse/spiral/oblique/comminuted]

DISPLACEMENT:
- Shortening: [cm]
- Angulation: [degrees, direction]

JOINTS:
- Hip: [visible portion normal/abnormal]
- Knee: [visible portion normal/abnormal]

SOFT TISSUES: [swelling, surgical emphysema]

IMPRESSION: [Fracture description]. [Displacement]. [Soft tissue findings].`,
    "femur,thigh,fracture,long bone",
    "X-ray of femur"
  ),

  // Knee - with laterality
  ...withLateralityAndViews(
    "X-Ray Knee",
    "Knee",
    ["AP", "Lateral", "Skyline (Patella)"],
    `X-RAY KNEE ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Distal femur: [normal/fracture]
- Proximal tibia: [normal/fracture - plateau]
- Fibula: [normal/fracture - head/neck]
- Patella: [normal/fracture/dislocated]

JOINT SPACES:
- Medial compartment: [maintained/narrowed]
- Lateral compartment: [maintained/narrowed]
- Patellofemoral: [maintained/narrowed]

ALIGNMENT: [normal/valgus/varus]

EFFUSION: [present/absent]

SOFT TISSUES: [swelling]

IMPRESSION: [Primary findings]. [OA changes]. [Fracture if present].`,
    "knee,joint,fracture,patella,oa",
    "X-ray of knee joint"
  ),
  {
    title: "X-Ray Knee - Osteoarthritis Evaluation",
    category: "X-Ray Knee",
    bodyPart: "Knee",
    description: "Knee X-ray for osteoarthritis assessment",
    modality: "X-Ray",
    tags: "knee,oa,osteoarthritis,degenerative",
    content: `X-RAY KNEE - OSTEOARTHRITIS EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
JOINT SPACE NARROWING:
- Medial compartment: [none/mild/moderate/severe]
- Lateral compartment: [none/mild/moderate/severe]
- Patellofemoral: [none/mild/moderate/severe]

OSTEOPHYTES:
- Femoral: [present/absent]
- Tibial: [present/absent]
- Patellar: [present/absent]

SCLEROSIS: [present/absent, location]

SUBCHONDRAL CYSTS: [present/absent]

ALIGNMENT:
- Varus/valgus: [neutral/varus/valgus deformity]

KAPELLIN-LAWRENCE GRADE:
- Grade 0: Normal
- Grade 1: Doubtful JSN, possible osteophytes
- Grade 2: Minimal osteophytes, possible JSN
- Grade 3: Multiple osteophytes, definite JSN, mild sclerosis
- Grade 4: Large osteophytes, marked JSN, severe sclerosis

IMPRESSION: [OA grade]. [Compartment involvement].`
  },
  {
    title: "X-Ray Knee - Weight-Bearing Views",
    category: "X-Ray Knee",
    bodyPart: "Knee",
    description: "Weight-bearing knee X-rays for accurate joint space",
    modality: "X-Ray",
    tags: "knee,weight bearing,standing,jsa",
    content: `X-RAY KNEE - WEIGHT-BEARING VIEWS

CLINICAL INDICATION: [Indication]

TECHNIQUE: Standing AP and PA views obtained.

FINDINGS:
JOINT SPACE (weight-bearing):
- Medial compartment: [mm] - [normal/narrowed]
- Lateral compartment: [mm] - [normal/narrowed]

ALIGNMENT (mechanical axis):
- Hip-knee-ankle angle: [degrees]
- Varus/valgus: [degrees deformity]

COMPARISON TO NON-WB: [difference in joint space]

IMPRESSION: [True joint space assessment]. [Alignment status].`
  },
  {
    title: "X-Ray Knee - Tibial Plateau Fracture",
    category: "X-Ray Knee",
    bodyPart: "Knee",
    description: "Knee X-ray for tibial plateau fracture",
    modality: "X-Ray",
    tags: "knee,tibial plateau,fracture,schatzker",
    content: `X-RAY KNEE - TIBIAL PLATEAU FRACTURE

CLINICAL INDICATION: [Indication - knee trauma]

FINDINGS:
FRACTURE:
- Location: [lateral plateau/medial plateau/bicondylar]
- Depression: [present/absent, mm]
- Split: [present/absent]

SCHATZKER CLASSIFICATION:
- Type I: Split lateral plateau
- Type II: Split-depression lateral plateau
- Type III: Pure depression lateral plateau
- Type IV: Medial plateau fracture
- Type V: Bicondylar fracture
- Type VI: Metaphyseal-diaphyseal separation

ASSOCIATED FINDINGS:
- Lipohemarthrosis: [present/absent]
- Fibular head fracture: [present/absent]

IMPRESSION: [Fracture type]. [Schatzker classification]. [CT recommended for surgical planning].`
  },

  // Leg (Tibia-Fibula) - with laterality
  ...withLateralityAndViews(
    "X-Ray Leg (Tibia-Fibula)",
    "Lower Extremity",
    ["AP", "Lateral"],
    `X-RAY LEG/TIBIA-FIBULA ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Tibia: [intact/fracture]
- Fibula: [intact/fracture]

FRACTURE DETAILS:
- Tibia location: [proximal/mid/distal]
- Fibula location: [proximal/mid/distal]
- Pattern: [transverse/spiral/oblique/comminuted]
- Displacement: [mm, angulation degrees]

ANKLE JOINT (visible): [normal/abnormal]

KNEE JOINT (visible): [normal/abnormal]

SOFT TISSUES: [swelling, surgical emphysema]

IMPRESSION: [Fracture description]. [Displacement]. [Both-bones injury if present].`,
    "tibia,fibula,leg,fracture,long bone",
    "X-ray of leg/tibia-fibula"
  ),

  // Ankle - with laterality
  ...withLateralityAndViews(
    "X-Ray Ankle",
    "Ankle/Foot",
    ["AP", "Lateral", "Mortise"],
    `X-RAY ANKLE ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Distal tibia: [normal/fracture]
- Distal fibula (lateral malleolus): [normal/fracture]
- Medial malleolus: [normal/fracture]
- Posterior malleolus: [normal/fracture]
- Talus: [normal/fracture]

JOINT SPACE:
- Tibiotalar: [maintained/widened]
- Clear space: [normal <4mm medially and laterally]

ANKLE MORTISE:
- Talar dome: [centered/subluxed]

SOFT TISSUES: [swelling, effusion]

IMPRESSION: [Fracture description]. [Ankle mortise integrity]. [Weber classification if fibula fracture].`,
    "ankle,joint,fracture,malleolus",
    "X-ray of ankle joint"
  ),
  {
    title: "X-Ray Ankle - Malleolar Fracture (Weber Classification)",
    category: "X-Ray Ankle/Foot",
    bodyPart: "Ankle/Foot",
    description: "Ankle fracture with Weber classification",
    modality: "X-Ray",
    tags: "ankle,fracture,weber,malleolus",
    content: `X-RAY ANKLE - MALLEOLAR FRACTURE

CLINICAL INDICATION: [Indication - ankle trauma]

FINDINGS:
FIBULA (LATERAL MALLEOLUS) FRACTURE:
- Location: [below/at/above syndesmosis]
- Weber classification:
  - Type A: [below syndesmosis - usually stable]
  - Type B: [at syndesmosis - stability varies]
  - Type C: [above syndesmosis - usually unstable]

MEDIAL MALLEOLUS: [intact/fracture]

POSTERIOR MALLEOLUS: [intact/fracture]

SYNDESMOSIS: [intact/widened]

ANKLE MORTISE: [stable/unstable]

IMPRESSION: [Weber type] fibula fracture. [Stability assessment]. [Bi-/tri-malleolar if applicable].`
  },

  // Foot - with laterality
  ...withLateralityAndViews(
    "X-Ray Foot",
    "Ankle/Foot",
    ["AP", "Oblique", "Lateral"],
    `X-RAY FOOT ([LATERALITY]) - [VIEWS] - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
BONES:
- Tarsals: [talus, calcaneus, navicular, cuneiforms, cuboid - normal/fracture]
- Metatarsals (1-5): [normal/fracture - specify]
- Phalanges: [normal/fracture - specify]
- Sesamoids: [normal]

JOINT SPACES:
- Subtalar: [maintained]
- Talonavicular: [maintained]
- Tarsometatarsal (TMT): [maintained/disrupted]

ALIGNMENT:
- Meary's angle: [normal/abnormal]
- Lateral TMT alignment: [normal/malaligned]

SOFT TISSUES: [swelling, foreign body]

IMPRESSION: [Fracture description]. [Alignment status].`,
    "foot,tarsal,metatarsal,fracture",
    "X-ray of foot"
  ),
  {
    title: "X-Ray Foot - Calcaneus Fracture",
    category: "X-Ray Ankle/Foot",
    bodyPart: "Ankle/Foot",
    description: "Calcaneus fracture evaluation",
    modality: "X-Ray",
    tags: "foot,calcaneus,calcaneal,fracture",
    content: `X-RAY FOOT - CALCANEUS FRACTURE

CLINICAL INDICATION: [Indication - fall from height]

FINDINGS:
CALCANEUS:
- Fracture: [present/absent]
- Bohler's angle: [degrees, normal 25-40 degrees]
- Critical angle: [degrees]
- Joint involvement: [subtalar joint involvement yes/no]

FRACTURE LINES:
- Primary fracture line: [described]
- Secondary fracture lines: [described]

ASSOCIATED FINDINGS:
- Other foot fractures: [present/absent]
- Compression of lateral wall: [present/absent]

IMPRESSION: [Calcaneus fracture]. [Bohler's angle]. [Intra-articular extension]. [CT recommended for surgical planning].`
  },
  {
    title: "X-Ray Foot - Flat Foot/Arch Assessment",
    category: "X-Ray Ankle/Foot",
    bodyPart: "Ankle/Foot",
    description: "Weight-bearing foot X-ray for arch assessment",
    modality: "X-Ray",
    tags: "foot,flat foot,pes planus,arch",
    content: `X-RAY FOOT - ARCH ASSESSMENT

CLINICAL INDICATION: [Indication - flat foot evaluation]

TECHNIQUE: Weight-bearing lateral view obtained.

FINDINGS:
ARCH ASSESSMENT:
- Meary's angle: [degrees] - normal: 0°
- Calcaneal pitch: [degrees] - normal: 15-20°
- Talus-first metatarsal angle: [degrees]

TARSAL RELATIONSHIPS:
- Talonavicular coverage: [normal/excessive]
- Tarsal coalition signs: [present/absent]

MEDIAL LONGITUDINAL ARCH: [normal/depressed]

IMPRESSION: [Flat foot severity]. [Measurements]. [Coalition signs if present].`
  },

  // ==================== SKULL/FACE X-RAYS ====================
  {
    title: "X-Ray Skull - AP View",
    category: "X-Ray Skull/Face",
    bodyPart: "Head/Brain",
    description: "AP view of skull",
    modality: "X-Ray",
    tags: "skull,ap view,head,trauma",
    content: `X-RAY SKULL (AP VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
CALVARIUM:
- Vault: [normal/fracture]
- Fracture: [linear/depressed, location]
- Foreign bodies: [none/seen]

SUTURES: [normal/widened]

SINUSES: [visible portions - normal/opaque]

SOFT TISSUES: [swelling, foreign body]

IMPRESSION: [Skull fracture status]. [Other findings].`
  },
  {
    title: "X-Ray Skull - Lateral View",
    category: "X-Ray Skull/Face",
    bodyPart: "Head/Brain",
    description: "Lateral view of skull",
    modality: "X-Ray",
    tags: "skull,lateral view,head,trauma",
    content: `X-RAY SKULL (LATERAL VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
CALVARIUM:
- Frontal bone: [normal/fracture]
- Parietal bones: [normal/fracture]
- Occipital bone: [normal/fracture]
- Temporal bones: [normal/fracture]

SELLA: [normal size/enlarged]

PINEAL GLAND: [calcified, position midline/shifted]

SUTURES: [open/closed]

SOFT TISSUES: [swelling location]

IMPRESSION: [Fracture status]. [Midline shift if pineal calcification displaced].`
  },
  {
    title: "X-Ray Skull - Towne's View",
    category: "X-Ray Skull/Face",
    bodyPart: "Head/Brain",
    description: "Towne's view for occiput evaluation",
    modality: "X-Ray",
    tags: "skull,towne,occiput,posterior",
    content: `X-RAY SKULL (TOWNE'S VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
OCCIPITAL BONE: [normal/fracture]

PETROUS RIDGES: [symmetric/asymmetric]

INTERNAL AUDITORY CANALS: [symmetric/widened]

POSTERIOR FOSSA: [normal/abnormal]

FORAMEN MAGNUM: [visible, normal]

IMPRESSION: [Primary findings].`
  },
  {
    title: "X-Ray Skull - Trauma Series",
    category: "X-Ray Skull/Face",
    bodyPart: "Head/Brain",
    description: "Complete skull series for trauma",
    modality: "X-Ray",
    tags: "skull,trauma,series,fracture",
    content: `X-RAY SKULL - TRAUMA SERIES

CLINICAL INDICATION: [Indication - head trauma]

TECHNIQUE: AP, lateral, and Towne's views obtained.

FINDINGS:
FRACTURES:
- Present: [yes/no]
- Location: [bone involved]
- Type: [linear/depressed/diastatic]
- Extension across suture: [yes/no]

PINEAL GLAND: [position - midline/shifted direction]

FOREIGN BODIES: [none/seen]

SOFT TISSUE SWELLING: [location]

IMPRESSION: [Skull fracture status]. [Depression if present]. [Note: CT brain recommended for intracranial evaluation].`
  },

  // Facial Bones
  {
    title: "X-Ray Facial Bones - Waters View",
    category: "X-Ray Skull/Face",
    bodyPart: "Head & Neck",
    description: "Waters view for maxillary sinuses",
    modality: "X-Ray",
    tags: "facial,waters,maxillary,sinus,fracture",
    content: `X-RAY FACIAL BONES (WATERS VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
MAXILLARY SINUSES:
- Right: [clear/opaque/fluid level]
- Left: [clear/opaque/fluid level]

ORBITAL FLOORS: [intact/fracture - blow-out]

ZYGOMATRIC COMPLEX: [intact/fracture]

NASAL BONES: [visible portion normal/fracture]

INFRAORBITAL RIMS: [intact/fracture]

IMPRESSION: [Sinus disease status]. [Fractures if present].`
  },
  {
    title: "X-Ray Facial Bones - Caldwell View",
    category: "X-Ray Skull/Face",
    bodyPart: "Head & Neck",
    description: "Caldwell view for frontal sinuses and orbits",
    modality: "X-Ray",
    tags: "facial,caldwell,frontal sinus,orbit",
    content: `X-RAY FACIAL BONES (CALDWELL VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
FRONTAL SINUSES:
- Right: [clear/opaque]
- Left: [clear/opaque]

ORBITS:
- Orbital rims: [intact/fracture]
- Orbital floors: [intact/abnormal]

ETHMOID SINUSES: [clear/opaque]

SUPRAORBITAL RIMS: [intact/fracture]

NASAL BONES: [visible portion]

IMPRESSION: [Primary findings].`
  },
  {
    title: "X-Ray Facial Bones - Facial Fracture",
    category: "X-Ray Skull/Face",
    bodyPart: "Head & Neck",
    description: "Complete facial bone series for trauma",
    modality: "X-Ray",
    tags: "facial,fracture,trauma,orbital,zygoma",
    content: `X-RAY FACIAL BONES - FRACTURE EVALUATION

CLINICAL INDICATION: [Indication - facial trauma]

TECHNIQUE: Waters, Caldwell, and lateral views obtained.

FINDINGS:
ORBITAL:
- Orbital floor: [intact/blow-out fracture]
- Medial wall: [intact/blow-out fracture]
- Orbital rim: [intact/fracture]

ZYGOMATIC COMPLEX:
- Arch: [intact/fracture]
- ZM suture: [intact/widened]
- ZF suture: [intact/widened]

NASAL BONES: [intact/fracture - deviated]

MAXILLA: [intact/fracture - Le Fort type suggested]

SINUSES: [air-fluid levels, opacification]

IMPRESSION: [Fracture description]. [Classification]. [CT recommended for complete evaluation].`
  },
  {
    title: "X-Ray Zygomatic Arch",
    category: "X-Ray Skull/Face",
    bodyPart: "Head & Neck",
    description: "Zygomatic arch view",
    modality: "X-Ray",
    tags: "zygoma,arch,fracture",
    content: `X-RAY ZYGOMATIC ARCH - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
ZYGOMATIC ARCH:
- Right: [intact/fracture - depressed/multiple fragments]
- Left: [intact/fracture - depressed/multiple fragments]

TRIPOD FRACTURE SIGNS: [assessed on other views]

IMPRESSION: [Zygomatic arch fracture status].`
  },

  // Orbit
  {
    title: "X-Ray Orbit - Blowout Fracture",
    category: "X-Ray Skull/Face",
    bodyPart: "Orbit",
    description: "Orbital blowout fracture evaluation",
    modality: "X-Ray",
    tags: "orbit,blowout,fracture,orbital floor",
    content: `X-RAY ORBIT - BLOWOUT FRACTURE

CLINICAL INDICATION: [Indication - eye injury]

FINDINGS:
ORBITAL FLOOR:
- Fracture: [present/absent]
- Teardrop sign: [present/absent]
- Location: [right/left]

ORBITAL CONTENTS:
- Herniation: [suggested]

MAXILLARY SINUS:
- Opacification: [present/absent - due to herniated tissue/hemorrhage]

MEDIAL WALL: [intact/fracture]

IMPRESSION: [Blowout fracture status]. [CT orbit recommended for surgical planning].`
  },
  {
    title: "X-Ray Orbit - Foreign Body",
    category: "X-Ray Skull/Face",
    bodyPart: "Orbit",
    description: "Orbital foreign body localization",
    modality: "X-Ray",
    tags: "orbit,foreign body,eye",
    content: `X-RAY ORBIT - FOREIGN BODY

CLINICAL INDICATION: [Indication - suspected foreign body]

FINDINGS:
FOREIGN BODY:
- Present: [yes/no]
- Location: [intraocular/extraocular - anterior/posterior]
- Size: [mm]
- Laterality: [right/left]

RADIO-OPAQUE VS LUCENT: [description]

ASSOCIATED FINDINGS:
- Fracture: [present/absent]
- Air: [intraocular/orbital]

IMPRESSION: [Foreign body location]. [CT for precise localization if needed].`
  },

  // Nasal Bone
  {
    title: "X-Ray Nasal Bone - Lateral View",
    category: "X-Ray Skull/Face",
    bodyPart: "Head & Neck",
    description: "Nasal bone X-ray",
    modality: "X-Ray",
    tags: "nasal bone,nose,fracture",
    content: `X-RAY NASAL BONE - REPORT

CLINICAL INDICATION: [Indication - nasal trauma]

FINDINGS:
NASAL BONE:
- Fracture: [present/absent]
- Location: [proximal/mid/distal]
- Displacement: [none/minimal/significant]
- Angulation: [direction]

SEPTUM: [midline/deviated]

SOFT TISSUE SWELLING: [present]

IMPRESSION: [Nasal bone fracture status]. [Displacement].`
  },

  // ==================== ENT/DENTAL X-RAYS ====================
  {
    title: "X-Ray PNS (Paranasal Sinuses)",
    category: "X-Ray ENT/Dental",
    bodyPart: "Sinuses",
    description: "Complete PNS series",
    modality: "X-Ray",
    tags: "pns,sinus,paranasal,sinusitis",
    content: `X-RAY PARANASAL SINUSES - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Waters, Caldwell, and lateral views obtained.

FINDINGS:
MAXILLARY SINUSES:
- Right: [clear/mucosal thickening/complete opacification/fluid level]
- Left: [clear/mucosal thickening/complete opacification/fluid level]

FRONTAL SINUSES:
- Development: [normal/hypoplastic/absent]
- Right: [clear/opaque]
- Left: [clear/opaque]

ETHMOID SINUSES: [clear/opaque]

SPHENOID SINUS: [clear/opaque]

OSTIOMEATAL COMPLEX: [patent/obstructed suggested]

NASAL SEPTUM: [midline/deviated - direction]

BONES: [intact/abnormal]

IMPRESSION: [Sinus disease status]. [Anatomic variations].`
  },
  {
    title: "X-Ray Mastoid - Schuller View",
    category: "X-Ray ENT/Dental",
    bodyPart: "Head & Neck",
    description: "Mastoid air cells evaluation",
    modality: "X-Ray",
    tags: "mastoid,ear,mastoiditis,schuller",
    content: `X-RAY MASTOID (SCHULLER VIEW) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
MASTOID AIR CELLS:
- Right: [well-pneumatized/sclerotic/opacity]
- Left: [well-pneumatized/sclerotic/opacity]

MASTOIDITIS SIGNS:
- Coalescence: [present/absent]
- Sclerotic changes: [present/absent]

BONY DESTRUCTION: [present/absent]

EXTERNAL AUDITORY CANAL: [normal]

IMPRESSION: [Mastoid air cell status]. [Mastoiditis signs if present].`
  },
  {
    title: "X-Ray OPG (Orthopantomogram)",
    category: "X-Ray ENT/Dental",
    bodyPart: "Head & Neck",
    description: "Dental panoramic X-ray",
    modality: "X-Ray",
    tags: "opg,dental,panoramic,teeth",
    content: `ORTHOPANTOMOGRAM (OPG) - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
TEETH:
- Present: [number and position]
- Missing: [describe]
- Caries: [present/absent - location]
- Restorations: [present - describe]
- Impactions: [present - wisdom teeth position]

ALVEOLAR BONE:
- Height: [normal/reduced - periodontal disease]
- Bone quality: [normal/osteopenic]

JAWS:
- Mandible: [symmetry, fractures]
- Maxilla: [normal/abnormal]

TEMPOROMANDIBULAR JOINTS:
- Condyles: [normal/abnormal]
- Joint space: [normal/narrowed/widened]

IMPRESSION: [Dental findings]. [Impactions]. [Periodontal status].`
  },

  // ==================== PEDIATRIC X-RAYS ====================
  {
    title: "X-Ray Pediatric - Chest",
    category: "X-Ray Pediatric",
    bodyPart: "Chest",
    description: "Pediatric chest X-ray",
    modality: "X-Ray",
    tags: "pediatric,chest,child,infant",
    content: `PEDIATRIC CHEST X-RAY - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
LUNGS:
- Lung volumes: [appropriate for age]
- Parenchyma: [clear/abnormalities]
- No consolidation, effusion

THYMUS: [normal shadow/prominent - "sail sign"]

CARDIAC:
- Cardiac silhouette: [normal for age]
- CTR varies with age

AIRWAY: [patent/foreign body]

TUBES/LINES: [if present - positions]

BONES: [intact/abnormal]

IMPRESSION: [Primary findings]. [Age-appropriate assessment].`
  },
  {
    title: "X-Ray Pediatric - Skeletal Survey (NAI)",
    category: "X-Ray Pediatric",
    bodyPart: "Whole Body",
    description: "Skeletal survey for non-accidental injury",
    modality: "X-Ray",
    tags: "pediatric,skeletal survey,nai,abuse",
    content: `PEDIATRIC SKELETAL SURVEY - REPORT

CLINICAL INDICATION: [Indication - NAI screen]

TECHNIQUE: Comprehensive skeletal survey as per protocol.

FINDINGS:
SKULL: [AP and lateral - findings]

CHEST: [Chest and ribs - findings]

ABDOMEN: [Findings]

SPINE: [Cervical, thoracic, lumbar - findings]

EXTREMITIES:
- Upper limbs: [humeri, forearms, hands - findings]
- Lower limbs: [femurs, legs, feet - findings]

HIGH-SPECIFICITY FRACTURES FOR NAI:
- Classic metaphyseal lesions: [present/absent]
- Posterior rib fractures: [present/absent]
- Scapular fractures: [present/absent]
- Sternal fractures: [present/absent]

MULTIPLE FRACTURES IN DIFFERENT HEALING STAGES: [present/absent]

IMPRESSION: [Fractures identified]. [Pattern consistent with/inconsistent with NAI]. [Follow-up survey recommended in 2 weeks].`
  },
  {
    title: "X-Ray Bone Age (Hand/Wrist)",
    category: "X-Ray Pediatric",
    bodyPart: "Wrist/Hand",
    description: "Bone age assessment",
    modality: "X-Ray",
    tags: "pediatric,bone age,hand,wrist,growth",
    content: `X-RAY BONE AGE (HAND/WRIST) - REPORT

CLINICAL INDICATION: [Indication - growth assessment]

FINDINGS:
HAND/WRIST:
- Carpal bones: [ossification centers present]
- Metacarpals: [epiphyses status]
- Phalanges: [epiphyses status]

BONE AGE ASSESSMENT:
- Greulich & Pyle method: Bone age [X] years
- Chronological age: [X] years
- Difference: [X] years [advanced/delayed]

TANNER-WHITEHOUSE METHOD (if used): [result]

IMPRESSION: Bone age [X] years. [Advanced/delayed by X years]. [Within normal limits if ± 2 SD].`
  },
  {
    title: "X-Ray Pediatric - Congenital Anomalies",
    category: "X-Ray Pediatric",
    bodyPart: "Whole Body",
    description: "Evaluation for congenital skeletal anomalies",
    modality: "X-Ray",
    tags: "pediatric,congenital,anomaly,skeletal dysplasia",
    content: `PEDIATRIC X-RAY - CONGENITAL ANOMALIES

CLINICAL INDICATION: [Indication]

FINDINGS:
SKELETAL SURVEY FINDINGS:
- Long bones: [length, bowing, metaphyseal changes]
- Hands/feet: [polydactyly/syndactyly/short metacarpals]
- Spine: [segmentation anomalies, scoliosis]
- Skull: [shape, sutures]
- Ribs: [number, shape]

SKELETAL DYSPLASIA FEATURES:
- Epiphyseal: [normal/abnormal]
- Metaphyseal: [normal/abnormal - fraying, cupping, splaying]
- Diaphyseal: [normal/abnormal]

BONE DENSITY: [normal/osteopenic/osteosclerotic]

IMPRESSION: [Skeletal findings]. [Suggested dysplasia if pattern recognized]. [Genetic correlation recommended].`
  },

  // ==================== TRAUMA X-RAYS ====================
  {
    title: "X-Ray - Polytrauma Series",
    category: "X-Ray Trauma",
    bodyPart: "Whole Body",
    description: "Polytrauma radiographic series",
    modality: "X-Ray",
    tags: "trauma,polytrauma,series,emergency",
    content: `X-RAY POLYTRAUMA SERIES - REPORT

CLINICAL INDICATION: [Indication - polytrauma]

TECHNIQUE: Chest, pelvis, and cervical spine X-rays.

FINDINGS:
CHEST:
- Pneumothorax: [present/absent]
- Hemothorax: [present/absent]
- Rib fractures: [present/absent - location]
- Lung parenchyma: [contusion/normal]

CERVICAL SPINE:
- Alignment: [normal/abnormal]
- Fractures: [present/absent]
- Prevertebral soft tissue: [normal/widened]

PELVIS:
- Fractures: [present/absent]
- Hip joints: [normal/dislocated]

IMPRESSION: [Acute life-threatening findings]. [Fracture summary]. [Further imaging recommendations].`
  },
  {
    title: "X-Ray - Cervical Spine Clearance",
    category: "X-Ray Trauma",
    bodyPart: "Cervical Spine",
    description: "Cervical spine clearance after trauma",
    modality: "X-Ray",
    tags: "trauma,cervical spine,clearance,c-spine",
    content: `X-RAY CERVICAL SPINE CLEARANCE - REPORT

CLINICAL INDICATION: [Indication - C-spine clearance]

TECHNIQUE: 3-view cervical spine series (AP, lateral, open-mouth).

FINDINGS:
ADEQUACY:
- Visualization: [C1-T1 visualized/not visualized]
- If C7-T1 not seen: [swimmer's view obtained or CT recommended]

ALIGNMENT:
- Anterior vertebral line: [smooth/disrupted]
- Posterior vertebral line: [smooth/disrupted]
- Spinolaminar line: [smooth/disrupted]

VERTEBRAE: [C1-C7 described]

SOFT TISSUES:
- Prevertebral at C2: [normal <7mm]
- Prevertebral at C6: [normal <22mm]

IMPRESSION: [Cervical spine cleared/Not cleared]. [If abnormal: describe findings]. [Recommend CT if inadequate visualization].`
  },
  {
    title: "X-Ray - Extremity Trauma",
    category: "X-Ray Trauma",
    bodyPart: "Extremities",
    description: "General extremity trauma evaluation",
    modality: "X-Ray",
    tags: "trauma,extremity,fracture,dislocation",
    content: `X-RAY EXTREMITY TRAUMA - REPORT

CLINICAL INDICATION: [Indication]

FINDINGS:
FRACTURE:
- Bone: [specify]
- Location: [proximal/mid/distal, intra-articular]
- Pattern: [transverse/spiral/oblique/comminuted/segmental]
- Displacement: [mm translation, degrees angulation]

DISLOCATION:
- Joint: [specify]
- Direction: [anterior/posterior/medial/lateral]

SOFT TISSUE: [swelling, surgical emphysema]

JOINT INVOLVEMENT: [intra-articular extension]

IMPRESSION: [Fracture/dislocation description]. [Displacement]. [Treatment considerations].`
  },

  // ==================== FOREIGN BODY X-RAYS ====================
  {
    title: "X-Ray - Airway Foreign Body",
    category: "X-Ray Foreign Body",
    bodyPart: "Chest",
    description: "Evaluation for airway foreign body",
    modality: "X-Ray",
    tags: "foreign body,airway,bronchus,aspiration",
    content: `X-RAY - AIRWAY FOREIGN BODY

CLINICAL INDICATION: [Indication - suspected aspiration]

FINDINGS:
FOREIGN BODY:
- Visible: [yes/no - radio-opaque]
- Location: [trachea/right main bronchus/left main bronchus]

INDIRECT SIGNS:
- Hyperinflation: [present/absent - affected side]
- Atelectasis: [present/absent - affected side]
- Mediastinal shift: [present/absent - direction]

EXPIRATORY VIEW:
- Air trapping: [present/absent]

IMPRESSION: [Foreign body suggested/direct visualization]. [Location]. [Recommend bronchoscopy if clinical suspicion high].`
  },
  {
    title: "X-Ray - GI Foreign Body",
    category: "X-Ray Foreign Body",
    bodyPart: "Abdomen",
    description: "Evaluation for GI tract foreign body",
    modality: "X-Ray",
    tags: "foreign body,gi tract,ingestion,coin",
    content: `X-RAY - GI FOREIGN BODY

CLINICAL INDICATION: [Indication - foreign body ingestion]

FINDINGS:
FOREIGN BODY:
- Present: [yes/no]
- Location: [esophagus/stomach/small bowel/large bowel]
- Type: [coin/battery/magnet/other]
- Size: [mm]

ESOPHAGEAL FOREIGN BODY:
- Level: [cervical/thoracic/abdominal]
- Orientation: [en face (coronal) - suggests esophageal]

COMPLICATIONS:
- Obstruction: [present/absent]
- Perforation: [free air present/absent]

IMPRESSION: [Foreign body location]. [Recommend endoscopy if esophageal]. [Follow-up recommendation].`
  },
  {
    title: "X-Ray - Soft Tissue Foreign Body",
    category: "X-Ray Foreign Body",
    bodyPart: "Soft Tissue",
    description: "Evaluation for soft tissue foreign body",
    modality: "X-Ray",
    tags: "foreign body,soft tissue,glass,metal",
    content: `X-RAY - SOFT TISSUE FOREIGN BODY

CLINICAL INDICATION: [Indication]

FINDINGS:
FOREIGN BODY:
- Visible: [yes/no]
- Location: [describe anatomical location]
- Size: [mm]
- Depth: [estimated from surface]

MATERIAL:
- Radio-opaque: [glass/metal/stone]
- Radiolucent: [wood/plastic - not visible on X-ray]

ASSOCIATED FINDINGS:
- Fracture: [present/absent]
- Gas in soft tissues: [present/absent]

IMPRESSION: [Foreign body location]. [Ultrasound recommended if radiolucent object suspected].`
  },
  {
    title: "X-Ray - Foreign Body Localization",
    category: "X-Ray Foreign Body",
    bodyPart: "Soft Tissue",
    description: "Multi-view foreign body localization",
    modality: "X-Ray",
    tags: "foreign body,localization,marker",
    content: `X-RAY - FOREIGN BODY LOCALIZATION

CLINICAL INDICATION: [Indication]

TECHNIQUE: [Two orthogonal views/Marker placement views]

FINDINGS:
FOREIGN BODY:
- Size: [mm in each dimension]
- Shape: [describe]

LOCALIZATION:
- AP view: Position relative to marker [description]
- Lateral view: Position relative to marker [description]
- Depth from skin surface: [mm]

RELATION TO CRITICAL STRUCTURES: [described]

IMPRESSION: [3D localization of foreign body]. [Recommendations for removal].`
  },

  // ==================== SPECIAL PROTOCOLS ====================
  {
    title: "X-Ray - Bone Length Study",
    category: "X-Ray Special Protocols",
    bodyPart: "Lower Extremity",
    description: "Leg length discrepancy measurement",
    modality: "X-Ray",
    tags: "bone length,scanogram,leg length,discrepancy",
    content: `X-RAY BONE LENGTH STUDY - REPORT

CLINICAL INDICATION: [Indication - leg length discrepancy]

TECHNIQUE: Standing scanogram of lower limbs.

FINDINGS:
MEASUREMENTS:
- Right femur: [mm]
- Left femur: [mm]
- Femoral length difference: [mm]

- Right tibia: [mm]
- Left tibia: [mm]
- Tibial length difference: [mm]

TOTAL LEG LENGTH DISCREPANCY: [mm]

PELVIS ALIGNMENT: [level/tilted - side]

IMPRESSION: [Leg length discrepancy]. [Predominant source - femoral/tibial]. [Clinical significance].`
  },
  {
    title: "X-Ray - Scanogram",
    category: "X-Ray Special Protocols",
    bodyPart: "Lower Extremity",
    description: "Lower limb scanogram",
    modality: "X-Ray",
    tags: "scanogram,leg length,lower limb",
    content: `X-RAY SCANOGRAM - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Orthoroentgenogram/Teleoroentgenogram of lower limbs.

FINDINGS:
MEASUREMENTS (from hip to ankle):
- Right lower limb: [mm]
- Left lower limb: [mm]
- Difference: [mm]

COMPONENT ANALYSIS:
- Femoral component difference: [mm]
- Tibial component difference: [mm]

ALIGNMENT: [described]

IMPRESSION: [Limb length assessment]. [Discrepancy measurement].`
  },
  {
    title: "X-Ray - Scoliosis Series",
    category: "X-Ray Special Protocols",
    bodyPart: "Whole Spine",
    description: "Full spine scoliosis series",
    modality: "X-Ray",
    tags: "scoliosis,whole spine,cobb angle",
    content: `X-RAY SCOLIOSIS SERIES - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Full spine PA and lateral views (standing).

FINDINGS:
PA VIEW:
- Primary curve: [thoracic/thoracolumbar/lumbar]
- Direction: [right/left convex]
- Cobb angle: [degrees]
- End vertebrae: [upper: __, lower: __]
- Apical vertebra: [__]
- Nash-Moe rotation: [grade at apical vertebra]

COMPENSATORY CURVES: [describe]

LATERAL VIEW:
- Thoracic kyphosis: [degrees]
- Lumbar lordosis: [degrees]
- Sagittal balance: [C7 plumb line position]

SKELETAL MATURITY: [Risser sign: 0-5]

VERTEBRAL ANOMALIES: [present/absent]

IMPRESSION: [Idiopathic/congenital/neuromuscular scoliosis]. [Curve measurement]. [Progression risk].`
  },
  {
    title: "X-Ray - Stress Views (Ligament)",
    category: "X-Ray Special Protocols",
    bodyPart: "Extremities",
    description: "Stress views for ligamentous instability",
    modality: "X-Ray",
    tags: "stress view,ligament,instability,ankle,knee",
    content: `X-RAY STRESS VIEWS - REPORT

CLINICAL INDICATION: [Indication - ligament injury]

TECHNIQUE: [Joint] stress views obtained.

FINDINGS:
JOINT: [Ankle/Knee/other]

STRESS APPLIED: [varus/valgus/anterior drawer]

MEASUREMENTS:
- Opening: [mm on stress view]
- Comparison to normal: [description]

NORMAL VALUES:
- Ankle: <5mm talar tilt normal
- Knee: <5mm valgus/varus opening normal

INSTABILITY: [present/absent]

COMPARISON: [with contralateral side if obtained]

IMPRESSION: [Ligamentous instability assessment]. [Severity].`
  },
  {
    title: "X-Ray - Dynamic Views (Flexion/Extension)",
    category: "X-Ray Special Protocols",
    bodyPart: "Spine",
    description: "Dynamic spine X-rays",
    modality: "X-Ray",
    tags: "dynamic,flexion,extension,instability,spine",
    content: `X-RAY DYNAMIC VIEWS - REPORT

CLINICAL INDICATION: [Indication - spinal instability]

TECHNIQUE: Flexion and extension lateral views of [cervical/lumbar] spine.

FINDINGS:
NEUTRAL POSITION:
- Alignment: [normal/abnormal]

FLEXION:
- Translation: [mm at level]
- Angulation: [degrees]
- Widening: [if present]

EXTENSION:
- Translation: [mm at level]
- Angulation: [degrees]

CHANGE BETWEEN POSITIONS:
- Translation difference: [mm]
- Normal: <3mm translation, <10° angulation

INSTABILITY SIGNS: [present/absent]

IMPRESSION: [Stability assessment]. [Level of instability if present].`
  },
  {
    title: "X-Ray - Pre/Post Operative Comparison",
    category: "X-Ray Special Protocols",
    bodyPart: "Multiple",
    description: "Pre and post-operative comparison",
    modality: "X-Ray",
    tags: "preoperative,postoperative,comparison,surgery",
    content: `X-RAY PRE/POST OPERATIVE COMPARISON - REPORT

CLINICAL INDICATION: [Indication - post-operative evaluation]

PROCEDURE: [Surgery type]

FINDINGS:
PRE-OPERATIVE:
- [Original pathology described]

POST-OPERATIVE:
IMPLANTS/HARDWARE:
- Type: [plate/screws/joint prosthesis]
- Position: [appropriate/malpositioned]
- Number: [count]

FRACTURE REDUCTION:
- Alignment: [anatomic/near-anatomic/poor]
- Residual displacement: [mm]

JOINT PROSTHESIS:
- Position: [appropriate]
- Cement: [adequate/loosening signs]
- Alignment: [neutral/varus/valgus]

COMPLICATIONS:
- Loosening: [present/absent]
- Infection signs: [present/absent]
- Hardware failure: [present/absent]

BONE HEALING: [progressing/delayed/non-union]

IMPRESSION: [Post-operative status]. [Hardware position]. [Healing progress].`
  }
];

async function main() {
  console.log('Starting X-Ray templates seeding...');

  // Get or create X-Ray category
  let category = await prisma.category.findFirst({
    where: { name: 'X-Ray' }
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'X-Ray',
        description: 'X-Ray radiography templates',
        icon: 'scan',
        color: 'text-blue-500'
      }
    });
    console.log('Created X-Ray category');
  }

  // Process templates
  let addedCount = 0;
  let skippedCount = 0;

  for (const templateData of xrayTemplates) {
    // Check if template already exists
    const existing = await prisma.template.findFirst({
      where: {
        title: templateData.title,
        categoryId: category.id
      }
    });

    if (existing) {
      skippedCount++;
      continue;
    }

    // Get or create body part
    let bodyPart = await prisma.bodyPart.findFirst({
      where: { name: templateData.bodyPart }
    });

    if (!bodyPart) {
      bodyPart = await prisma.bodyPart.create({
        data: {
          name: templateData.bodyPart,
          description: `${templateData.bodyPart} examinations`
        }
      });
    }

    // Create template
    await prisma.template.create({
      data: {
        title: templateData.title,
        description: templateData.description,
        content: templateData.content,
        categoryId: category.id,
        bodyPartId: bodyPart.id,
        modality: 'X-Ray',
        tags: templateData.tags
      }
    });

    addedCount++;
  }

  console.log(`X-Ray templates seeding complete!`);
  console.log(`Added: ${addedCount} templates`);
  console.log(`Skipped (already exist): ${skippedCount} templates`);

  // Show total counts
  const totalTemplates = await prisma.template.count();
  const totalBodyParts = await prisma.bodyPart.count();
  console.log(`\nTotal templates in database: ${totalTemplates}`);
  console.log(`Total body parts in database: ${totalBodyParts}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
