import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Laterality options for joint procedures
const lateralities = ['Right', 'Left', 'Bilateral'];

// Helper to generate laterality variants for joint procedures
function withLaterality(baseTitle: string, bodyPart: string, content: string, tags: string, description: string) {
  const templates: any[] = [];
  lateralities.forEach(lat => {
    templates.push({
      title: `${baseTitle} - ${lat}`,
      category: `Fluoroscopy ${bodyPart}`,
      bodyPart: bodyPart,
      description: `${description} - ${lat} side`,
      modality: "Fluoroscopy",
      tags: `${tags},${lat.toLowerCase()}`,
      content: content.replace(/\[LATERALITY\]/g, lat)
    });
  });
  return templates;
}

const fluoroscopyTemplates: any[] = [
  // ==================== GASTROINTESTINAL - ESOPHAGUS ====================
  // Barium Swallow
  {
    title: "Barium Swallow - Single Contrast",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Single contrast barium swallow study",
    modality: "Fluoroscopy",
    tags: "barium swallow,esophagus,single contrast,gi",
    content: `BARIUM SWALLOW (SINGLE CONTRAST) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Patient ingested barium sulfate suspension. Fluoroscopic evaluation performed in multiple projections.

FINDINGS:
ESOPHAGUS:
- Cervical esophagus: [normal/abnormal]
- Thoracic esophagus: [normal/abnormal]
- Distal esophagus/GE junction: [normal/abnormal]

CONTRAST FLOW:
- Normal peristalsis: [present/absent]
- Filling defects: [present/absent - describe]
- Narrowing/stricture: [present/absent - location, length]
- Dilatation: [present/absent - location]

GE JUNCTION:
- Position: [normal/hiatal hernia]
- Gastroesophageal reflux: [present/absent]

ASPIRATION: [none/detected]

IMPRESSION: [Primary findings]. [Stricture/reflux/mass if present].`
  },
  {
    title: "Barium Swallow - Double Contrast",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Double contrast barium swallow for mucosal detail",
    modality: "Fluoroscopy",
    tags: "barium swallow,esophagus,double contrast,mucosal",
    content: `BARIUM SWALLOW (DOUBLE CONTRAST) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Double contrast technique with barium and gas-producing crystals. Multiple spot images obtained.

FINDINGS:
MUCOSAL SURFACE:
- Coating: [excellent/good/fair]
- Mucosal pattern: [normal/abnormal]

ESOPHAGEAL LESIONS:
- Ulcers: [present/absent - location, number]
- Plaques: [present/absent]
- Nodules: [present/absent]
- Mass: [present/absent - location, size]

ESOPHAGITIS SIGNS:
- Erythema: [not applicable on fluoroscopy]
- Ulceration: [present/absent]
- Stricture: [present/absent]

HIATAL HERNIA: [present/absent - type, size]

SCHATZKI'S RING: [present/absent - diameter]

IMPRESSION: [Mucosal abnormalities]. [Mass/ulcer/reflux esophagitis].`
  },
  {
    title: "Barium Swallow - Motility Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Esophageal motility study",
    modality: "Fluoroscopy",
    tags: "barium swallow,motility,peristalsis,dysphagia",
    content: `ESOPHAGEAL MOTILITY STUDY - REPORT

CLINICAL INDICATION: [Indication - dysphagia]

TECHNIQUE: Fluoroscopic evaluation of esophageal motility with barium swallows in prone and upright positions.

FINDINGS:
PERISTALSIS:
- Primary peristalsis: [normal/impaired/absent]
- Secondary peristalsis: [normal/impaired]
- Tertiary contractions: [present/absent]

ESOPHAGEAL CLEARANCE:
- Single swallow: [complete/incomplete clearance]
- Multiple swallows: [assessment]

SPECIFIC DISORDERS:
- Achalasia features: [bird's beak, dilated esophagus - present/absent]
- Diffuse esophageal spasm: [corkscrew esophagus - present/absent]
- Scleroderma features: [smooth tapering, aperistalsis]

LOWER ESOPHAGEAL SPHINCTER:
- Relaxation: [normal/incomplete/absent]

TRANSIT TIME: [normal/prolonged]

IMPRESSION: [Motility pattern]. [Suggested diagnosis - achalasia/DES/scleroderma/other].`
  },
  {
    title: "Barium Swallow - Reflux Study",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Evaluation for gastroesophageal reflux",
    modality: "Fluoroscopy",
    tags: "barium swallow,reflux,gerd,gastroesophageal",
    content: `BARIUM SWALLOW - REFLUX EVALUATION

CLINICAL INDICATION: [Indication - suspected GERD]

TECHNIQUE: Barium swallow with provocative maneuvers for reflux assessment.

FINDINGS:
GASTROESOPHAGEAL REFLUX:
- Spontaneous reflux: [present/absent]
- Provoked reflux: [present/absent]
- Reflux severity: [grade I/II/III/IV]
  - Grade I: Lower esophagus only
  - Grade II: Above carina
  - Grade III: Cervical esophagus
  - Grade IV: Pharynx

HIATAL HERNIA:
- Present: [yes/no]
- Type: [sliding/paraesophageal/mixed]
- Size: [cm above diaphragm]

ESOPHAGEAL CLEARANCE: [normal/delayed]

ESOPHAGITIS CHANGES: [present/absent]

ASPIRATION: [present/absent]

IMPRESSION: [GERD status]. [Hiatal hernia]. [Esophagitis signs]. [Note: Barium swallow has low sensitivity for reflux - consider pH monitoring].`
  },
  {
    title: "Barium Swallow - Stricture/Web/Ring Evaluation",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Evaluation of esophageal narrowing",
    modality: "Fluoroscopy",
    tags: "barium swallow,stricture,web,ring,schatzki",
    content: `BARIUM SWALLOW - STRUCTURAL EVALUATION

CLINICAL INDICATION: [Indication - dysphagia]

FINDINGS:
NARROWING/STRICTURE:
- Location: [cervical/thoracic/distal]
- Length: [cm]
- Diameter: [mm]
- Margins: [smooth/irregular/tapered]
- Cause: [peptic/malignant/caustic/other]

ESOPHAGEAL WEB:
- Present: [yes/no]
- Location: [cervical esophagus - typical]
- Appearance: [thin, anterior, shelf-like]
- Associated: [Plummer-Vinson syndrome if iron deficiency]

ESOPHAGEAL RING:
- Schatzki's ring: [present/absent]
- Location: [GE junction]
- Diameter: [mm] - symptomatic if <13mm

MALIGNANT FEATURES:
- Shouldered margins: [present/absent]
- Irregular mucosa: [present/absent]
- Mass effect: [present/absent]

PROXIMAL DILATATION: [present/absent]

IMPRESSION: [Stricture/web/ring description]. [Benign vs malignant features]. [Recommend endoscopy for histological correlation].`
  },
  {
    title: "Barium Swallow - Achalasia Evaluation",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Fluoroscopic evaluation for achalasia",
    modality: "Fluoroscopy",
    tags: "barium swallow,achalasia,motility,dysphagia",
    content: `BARIUM SWALLOW - ACHALASIA EVALUATION

CLINICAL INDICATION: [Indication - suspected achalasia]

FINDINGS:
ESOPHAGEAL BODY:
- Caliber: [normal/dilated]
- Degree of dilatation: [mild/moderate/severe/sigmoid]
- Peristalsis: [normal/weak/absent]
- Tertiary contractions: [present/absent]

DISTAL ESOPHAGUS:
- Bird's beak appearance: [present/absent]
- Tapered narrowing: [at GE junction]
- Length of narrowed segment: [cm]

CARDIA:
- Opening: [normal/absent/poorly relaxing]

STOMACH:
- Air: [decreased - air-fluid level in esophagus]

STAGING (if achalasia):
- Stage I: Mild dilatation, no tortuosity
- Stage II: Moderate dilatation, no tortuosity
- Stage III: Severe dilatation, tortuous

IMPRESSION: [Achalasia features present/absent]. [Stage if present]. [Recommend manometry for confirmation].`
  },

  // Video Fluoroscopic Swallow Study (VFSS)
  {
    title: "VFSS - Complete Study",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Video fluoroscopic swallow study complete assessment",
    modality: "Fluoroscopy",
    tags: "vfss,swallow study,aspiration,dysphagia,speech",
    content: `VIDEO FLUOROSCOPIC SWALLOW STUDY (VFSS) - REPORT

CLINICAL INDICATION: [Indication - dysphagia, aspiration risk]

TECHNIQUE: Dynamic fluoroscopic evaluation of swallowing with varying consistencies.

FINDINGS:
ORAL PHASE:
- Lip seal: [intact/impaired]
- Tongue mobility: [normal/impaired]
- Bolus formation: [normal/impaired]
- Oral residue: [none/mild/moderate/severe]

PHARYNGEAL PHASE:
- Pharyngeal constriction: [normal/reduced]
- Laryngeal elevation: [normal/reduced/absent]
- Epiglottic tilt: [normal/impaired]
- CP opening: [normal/reduced]

ESOPHAGEAL PHASE:
- Primary peristalsis: [normal/impaired]
- Clearance: [complete/incomplete]

AIRWAY PROTECTION:
- Penetration: [none/intermittent/consistent]
  - Depth: [supraglottic/intraglottic]
- Aspiration: [none/silent/overt]
  - Response: [cough/no response]

CONSISTENCY TRIALS:
- Thin liquid: [safe/unsafe]
- Nectar thick: [safe/unsafe]
- Honey thick: [safe/unsafe]
- Puree: [safe/unsafe]
- Solid: [safe/unsafe]

COMPENSATORY STRATEGIES:
- Chin tuck: [effective/not effective]
- Head turn: [effective/not effective]
- Other: [describe]

IMPRESSION: [Swallowing safety status]. [Recommendations for diet modification]. [Therapy recommendations].`
  },
  {
    title: "VFSS - Oral Phase Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Focus on oral phase of swallowing",
    modality: "Fluoroscopy",
    tags: "vfss,oral phase,swallow,tongue",
    content: `VFSS - ORAL PHASE ASSESSMENT

CLINICAL INDICATION: [Indication]

FINDINGS:
ORAL PREPARATORY PHASE:
- Lip closure: [adequate/inadequate]
- Mastication: [normal/impaired]
- Bolus formation: [normal/impaired]

ORAL PROPULSIVE PHASE:
- Tongue movement: [normal/impaired]
- Tongue base retraction: [normal/reduced]
- Bolus transport: [normal/impaired]
- Timing: [normal/prolonged]

ORAL RESIDUE:
- Location: [anerior/lateral/coating]
- Severity: [none/mild/moderate/severe]

ABNORMALITIES:
- Tongue thrust: [present/absent]
- Oral incoordination: [present/absent]

IMPRESSION: [Oral phase status]. [Recommendations].`
  },
  {
    title: "VFSS - Pharyngeal Phase Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Focus on pharyngeal phase of swallowing",
    modality: "Fluoroscopy",
    tags: "vfss,pharyngeal phase,swallow,larynx",
    content: `VFSS - PHARYNGEAL PHASE ASSESSMENT

CLINICAL INDICATION: [Indication]

FINDINGS:
PHARYNGEAL CONTRACTION:
- Pharyngeal strip: [normal/reduced]
- Pharyngeal residue: [none/mild/moderate/severe - valleculae, pyriforms]

LARYNGEAL ELEVURATION:
- Degree: [normal/reduced]
- Duration: [adequate/inadequate]

AIRWAY CLOSURE:
- Epiglottic inversion: [complete/incomplete]
- True vocal fold closure: [assessed clinically/impared]
- Vestibular closure: [normal/impaired]

CRICOPHARYNGEUS:
- Opening: [normal/reduced/delayed]
- Relaxation: [complete/incomplete]

PHARYNGEAL TRANSIT TIME: [normal/prolonged]

IMPRESSION: [Pharyngeal phase status]. [CP dysfunction if present]. [Residue pattern].`
  },
  {
    title: "VFSS - Aspiration Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Esophagus",
    description: "Detailed aspiration evaluation",
    modality: "Fluoroscopy",
    tags: "vfss,aspiration,pneumonia risk,airway",
    content: `VFSS - ASPIRATION ASSESSMENT

CLINICAL INDICATION: [Indication - aspiration risk]

FINDINGS:
PENETRATION-ASPIRATION SCALE (PAS):
- Score: [1-8]
  - 1: No penetration
  - 2: Penetration, cleared
  - 3: Penetration, above cords, not cleared
  - 4: Penetration, contact with cords, cleared
  - 5: Penetration, contact with cords, not cleared
  - 6: Aspiration, cleared
  - 7: Aspiration, not cleared
  - 8: Silent aspiration

ASPIRATION:
- Occurred: [yes/no]
- Consistency: [thin/nectar/honey/puree/solid]
- Amount: [trace/small/moderate/large]
- Response: [cough/throat clear/none - silent]
- Clearance: [complete/partial/none]

SILENT ASPIRATION: [detected/not detected]

PNEUMONIA RISK: [low/moderate/high]

SAFE CONSISTENCIES: [list]

IMPRESSION: [Aspiration status]. [Safe diet recommendations]. [NPO consideration].`
  },

  // ==================== STOMACH/DUODENUM ====================
  {
    title: "Barium Meal - Single Contrast",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Single contrast barium meal",
    modality: "Fluoroscopy",
    tags: "barium meal,stomach,single contrast,upper gi",
    content: `BARIUM MEAL (SINGLE CONTRAST) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Patient ingested barium suspension. Fluoroscopic evaluation of stomach and duodenum.

FINDINGS:
STOMACH:
- Position: [normal/ptotic]
- Size: [normal/small/large]
- Shape: [normal/cascade/other]
- Filling defects: [present/absent]
- Ulcer crater: [present/absent - location]
- Outlet: [patent/obstructed]

DUODENUM:
- Bulb: [normal/deformed/ulcer]
- Loop: [normal/abnormal]
- Mucosa: [normal/abnormal]

PERISTALSIS: [normal/abnormal]

GASTRIC EMPTYING: [normal/delayed]

IMPRESSION: [Primary findings]. [Ulcer/mass/obstruction if present].`
  },
  {
    title: "Barium Meal - Double Contrast",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Double contrast barium meal for mucosal detail",
    modality: "Fluoroscopy",
    tags: "barium meal,stomach,double contrast,mucosal",
    content: `BARIUM MEAL (DOUBLE CONTRAST) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Double contrast technique with barium and gas-producing crystals. Prone and supine views obtained.

FINDINGS:
STOMACH:
- Mucosal coating: [excellent/good/fair]
- Areae gastricae: [normal/abnormal]
- Folds: [normal/thickened/effaced]

LESIONS:
- Ulcer: [benign/malignant features]
  - Location: [describe]
  - Size: [mm]
  - Hampton's line: [present/absent]
  - Collar button: [present/absent]
- Mass: [present/absent - size, location, type]
- Polyp: [present/absent - size, location]

DUODENAL BULB:
- Deformity: [present/absent - cloverleaf/scarring]
- Ulcer: [present/absent]

DUODENAL LOOP:
- Mucosa: [normal/abnormal]

IMPRESSION: [Mucosal findings]. [Ulcer with benign/malignant features]. [Recommend endoscopy for biopsy].`
  },
  {
    title: "Barium Meal - Ulcer Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Detailed ulcer evaluation",
    modality: "Fluoroscopy",
    tags: "barium meal,ulcer,gastric,duodenal",
    content: `BARIUM MEAL - ULCER ASSESSMENT

CLINICAL INDICATION: [Indication - suspected ulcer]

FINDINGS:
ULCER LOCATION:
- Gastric: [antrum/body/fundus - along lesser/greater curvature]
- Duodenal: [bulb/post-bulbar]

ULCER CHARACTERISTICS:
- Size: [mm]
- Shape: [round/oval/linear/irregular]
- Depth: [shallow/deep]

GASTRIC ULCER - BENIGN VS MALIGNANT:
Benign features:
- Hampton's line: [present/absent]
- Collar button shape: [present/absent]
- Smooth mound: [present/absent]
- Project beyond lumen: [yes/no]

Malignant features:
- Irregular margins: [present/absent]
- Nodular mound: [present/absent]
- Within lumen: [yes/no]
- Carman's meniscus sign: [present/absent]

DUODENAL ULCER:
- Bulb deformity: [present/absent]
- Cloverleaf deformity: [present/absent]

COMPLICATIONS:
- Outlet obstruction: [present/absent]
- Penetration: [suggested/not suggested]

IMPRESSION: [Ulcer description]. [Benign vs malignant assessment]. [Recommend endoscopy for all gastric ulcers].`
  },
  {
    title: "Barium Meal - Mass Lesion Evaluation",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Evaluation of gastric mass/tumor",
    modality: "Fluoroscopy",
    tags: "barium meal,mass,tumor,gastric cancer",
    content: `BARIUM MEAL - MASS LESION EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
MASS CHARACTERISTICS:
- Location: [antrum/body/fundus/cardia]
- Size: [dimensions]
- Morphology: [polypoid/ulcerated/infiltrative]

MUCOSAL PATTERN:
- Effaced: [present/absent]
- Nodular: [present/absent]
- Ulcerated: [present/absent]

GASTRIC WALL:
- Rigidity: [present/absent]
- Linitis plastica features: [present/absent]

LUMEN:
- Narrowed: [yes/no]
- Dilated proximal: [yes/no]

CLASSIFICATION (Borrmann):
- Type I: Polypoid
- Type II: Fungating with ulcer
- Type III: Infiltrating with ulcer
- Type IV: Diffusely infiltrating

EXTENSION:
- Beyond stomach: [suggested/not seen on fluoroscopy]

IMPRESSION: [Mass description]. [Suggest gastric carcinoma]. [Recommend endoscopy with biopsy and CT staging].`
  },
  {
    title: "Barium Meal - Gastric Outlet Obstruction",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Evaluation of gastric outlet obstruction",
    modality: "Fluoroscopy",
    tags: "barium meal,obstruction,outlet,gastric",
    content: `BARIUM MEAL - GASTRIC OUTLET OBSTRUCTION

CLINICAL INDICATION: [Indication - vomiting, distension]

FINDINGS:
STOMACH:
- Size: [normal/distended]
- Contents: [fluid level, retained food]
- Peristalsis: [normal/increased/absent]

PYLORUS:
- Diameter: [mm or non-patent]
- Barium passage: [immediate/delayed/absent]

DUODENAL BULB:
- Visualized: [yes/no]
- Deformed: [yes/no]

DELAYED IMAGING:
- 4-hour film: [barium in stomach/duodenum/passed]

OBSTRUCTION CAUSE:
- Peptic stricture: [likely/unlikely]
- Malignancy: [likely/unlikely]
- Extrinsic compression: [suggested/not suggested]

GASTRIC EMPTYING: [severely delayed/absent]

IMPRESSION: [Gastric outlet obstruction present/absent]. [Severity]. [Suspected etiology].`
  },
  {
    title: "Upper GI Series - Complete",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Complete upper GI series (esophagus, stomach, duodenum)",
    modality: "Fluoroscopy",
    tags: "upper gi,barium,esophagus,stomach,duodenum",
    content: `UPPER GI SERIES (COMPLETE) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Barium examination of esophagus, stomach, and duodenum with double contrast technique.

FINDINGS:
ESOPHAGUS:
- Mucosa: [normal/abnormal]
- Peristalsis: [normal/abnormal]
- GE junction: [normal/hiatal hernia]
- Reflux: [present/absent]

STOMACH:
- Position: [normal/abnormal]
- Mucosal pattern: [normal/abnormal]
- Ulcer: [present/absent - location, features]
- Mass: [present/absent]
- Filling defects: [none/present]

DUODENUM:
- Bulb: [normal/deformed/ulcer]
- Loop: [normal/abnormal]
- Papilla region: [normal/abnormal]

GASTRIC EMPTYING: [normal/delayed]

HIATAL HERNIA: [present/absent - type]

IMPRESSION: [Complete upper GI findings]. [Significant abnormalities].`
  },
  {
    title: "Upper GI Series - Post-Operative",
    category: "Fluoroscopy GI",
    bodyPart: "Stomach",
    description: "Post-operative upper GI evaluation",
    modality: "Fluoroscopy",
    tags: "upper gi,postoperative,surgery,anastomosis",
    content: `UPPER GI SERIES (POST-OPERATIVE) - REPORT

CLINICAL INDICATION: [Indication - post-op evaluation]
SURGERY: [Type of surgery - partial gastrectomy, bypass, etc.]

TECHNIQUE: Water-soluble contrast used initially to exclude leak.

FINDINGS:
RESECTION SITE:
- Stomach remnant: [size, configuration]

ANASTOMOSIS:
- Type: [Billroth I/Billroth II/Roux-en-Y/other]
- Site: [gastroduodenal/gastrojejunal]
- Patency: [patent/narrowed/obstructed]

ANASTOMOTIC LEAK:
- Present: [yes/no]
- Size: [mm]
- Location: [describe]

AfferENT LOOP: [visualized, normal/dilated]
EFFERENT LOOP: [visualized, normal/dilated]

STOMACH REMNANT:
- Emptying: [normal/delayed]

DUODENUM (if applicable): [visualized, normal/abnormal]

COMPLICATIONS:
- Leak: [present/absent]
- Obstruction: [present/absent]
- Stricture: [present/absent]

IMPRESSION: [Post-operative anatomy]. [Anastomotic patency]. [Complications].`
  },

  // ==================== SMALL BOWEL ====================
  {
    title: "Small Bowel Follow-Through",
    category: "Fluoroscopy GI",
    bodyPart: "Small Bowel",
    description: "Standard small bowel follow-through",
    modality: "Fluoroscopy",
    tags: "sbft,small bowel,follow through,transit",
    content: `SMALL BOWEL FOLLOW-THROUGH - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Patient ingested barium. Serial abdominal radiographs obtained until barium reaches colon.

FINDINGS:
TRANSIT TIME:
- Stomach: [normal/delayed]
- Small bowel: [minutes/hours to cecum]
- Normal: 30-120 minutes

DUODENUM:
- Bulb: [normal/abnormal]
- Loop: [normal/abnormal]

JEJUNUM:
- Caliber: [normal/dilated/narrowed]
- Mucosal fold pattern: [normal/thickened/effaced]
- Peristalsis: [normal/abnormal]

ILEUM:
- Caliber: [normal/dilated/narrowed]
- Terminal ileum: [normal/abnormal]
- Ileocecal valve: [normal/abnormal]

CECUM: [opacified, normal/abnormal]

ABNORMALITIES:
- Filling defects: [present/absent]
- Strictures: [present/absent - location, length]
- Dilatation: [present/absent - segment]
- Mucosal thickening: [present/absent]

IMPRESSION: [Small bowel findings]. [Transit assessment]. [Pathology if present].`
  },
  {
    title: "Small Bowel Follow-Through - Transit Time Study",
    category: "Fluoroscopy GI",
    bodyPart: "Small Bowel",
    description: "Focus on intestinal transit time",
    modality: "Fluoroscopy",
    tags: "sbft,transit time,motility",
    content: `SMALL BOWEL TRANSIT TIME STUDY - REPORT

CLINICAL INDICATION: [Indication - motility disorder]

FINDINGS:
STOMACH EMPTYING:
- Time to empty: [minutes/hours]
- Normal: 30-90 minutes

SMALL BOWEL TRANSIT:
- Time to cecum: [minutes/hours]
- Normal: 30-120 minutes

SEGMENTAL ASSESSMENT:
- Duodenum: [immediate/delayed]
- Jejunum: [time assessed]
- Ileum: [time assessed]
- Terminal ileum: [time assessed]

MOTILITY PATTERN:
- Peristalsis: [normal/hyperactive/hypoactive]
- Propulsion: [normal/retrograde/stasis]

DELAYED TRANSIT:
- Cause: [mechanical/functional]
- Transition point: [identified/not identified]

RAPID TRANSIT:
- Present: [yes/no]

IMPRESSION: [Transit time]. [Normal/abnormal]. [Motility assessment].`
  },
  {
    title: "Small Bowel Follow-Through - Crohn's Disease",
    category: "Fluoroscopy GI",
    bodyPart: "Small Bowel",
    description: "Evaluation for Crohn's disease",
    modality: "Fluoroscopy",
    tags: "sbft,crohn,ibd,terminal ileum",
    content: `SMALL BOWEL FOLLOW-THROUGH - CROHN'S EVALUATION

CLINICAL INDICATION: [Indication - suspected/known Crohn's disease]

FINDINGS:
TERMINAL ILEUM:
- Caliber: [normal/narrowed - string sign]
- Mucosa: [cobblestone appearance/ulceration/thickened folds]
- Length of involvement: [cm]

SKIP LESIONS:
- Present: [yes/no]
- Locations: [describe]

STRICTURES:
- Present: [yes/no]
- Locations: [describe]
- Length: [cm]
- Pre-stenotic dilatation: [present/absent]

FISTULAS:
- Present: [yes/no]
- Type: [entero-enteric/entero-colic/entero-cutaneous/entero-vesical]

COBBLESTONE APPEARANCE: [present/absent - location]

ULCERATIONS:
- Aphthous: [present/absent]
- Deep: [present/absent]

MESENTERIC CHANGES:
- Separation of loops: [present/absent]
- Mass effect: [present/absent]

CECUM: [involved/uninvolved]

IMPRESSION: [Crohn's disease features]. [Disease extent]. [Complications - stricture/fistula]. [Recommend CT/MR enterography for comprehensive assessment].`
  },
  {
    title: "Small Bowel Follow-Through - Malabsorption",
    category: "Fluoroscopy GI",
    bodyPart: "Small Bowel",
    description: "Evaluation for malabsorption disorders",
    modality: "Fluoroscopy",
    tags: "sbft,malabsorption,celiac,sprue",
    content: `SMALL BOWEL FOLLOW-THROUGH - MALABSORPTION EVALUATION

CLINICAL INDICATION: [Indication - malabsorption]

FINDINGS:
SMALL BOWEL CALIBER:
- Jejunum: [normal/dilated]
- Ileum: [normal/dilated]
- Flocculation: [present/absent]
- Segmentation: [present/absent]

MUCOSAL FOLD PATTERN:
- Jejunum: [normal/thickened/reversed - ilealization]
- Ileum: [normal/thickened/jejunization]

CELIAC DISEASE FEATURES:
- Dilated small bowel: [present/absent]
- Thickened folds: [present/absent]
- Reversal of fold pattern: [present/absent]
- Transient intussusception: [present/absent]

FLOCCULATION OF BARIUM: [present/absent]

SECRETION:
- Excess fluid: [suggested by dilution of barium]

COLLAGENOUS SPRUE: [no specific fluoroscopic features]

IMPRESSION: [Malabsorption pattern]. [Suggest celiac disease if features present]. [Recommend serology and biopsy].`
  },
  {
    title: "Small Bowel Enteroclysis",
    category: "Fluoroscopy GI",
    bodyPart: "Small Bowel",
    description: "Enteroclysis with contrast infusion",
    modality: "Fluoroscopy",
    tags: "enteroclysis,small bowel,infusion,mucosal",
    content: `SMALL BOWEL ENTEROCYSIS - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Nasojejunal tube placed distal to ligament of Treitz. Contrast infused under fluoroscopy.

FINDINGS:
DUODENUM:
- Caliber: [normal/abnormal]
- Mucosa: [normal/abnormal]

JEJUNUM:
- Distension: [good/fair/poor]
- Lumen: [normal/narrowed/dilated]
- Folds: [normal/thickened/effaced]
- Peristalsis: [normal/abnormal]

ILEUM:
- Distension: [good/fair/poor]
- Terminal ileum: [normal/abnormal]

LESIONS:
- Filling defects: [present/absent - size, location]
- Strictures: [present/absent - location, length, type]
- Mucosal irregularity: [present/absent]

MESSENTIAL CHANGES:
- Loop separation: [present/absent]
- Mass effect: [present/absent]

ADVANTAGES OVER SBFT:
- Better distension
- More detailed mucosal assessment

IMPRESSION: [Small bowel findings]. [Detailed mucosal assessment].`
  },
  {
    title: "Small Bowel Enteroclysis - Detailed Mucosal Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Small Bowel",
    description: "Detailed mucosal evaluation",
    modality: "Fluoroscopy",
    tags: "enteroclysis,mucosal,detail",
    content: `ENTEROCYSIS - DETAILED MUCOSAL ASSESSMENT

CLINICAL INDICATION: [Indication]

FINDINGS:
FOLD PATTERN:
- Jejunal folds: [number per inch, normal 5-7]
- Ileal folds: [number per inch, normal 2-4]
- Fold thickness: [normal/thickened]

MUCOSAL SURFACE:
- Smooth: [yes/no]
- Nodular: [yes/no - size, distribution]
- Ulcerated: [yes/no - location]

SPECIFIC FINDINGS:
- Aphthous ulcers: [present/absent]
- Cobblestoning: [present/absent]
- Polyps: [present/absent - size, location]
- Tumors: [present/absent - size, location, type]

WALL THICKENING:
- Present: [yes/no]
- Symmetric/asymmetric: [describe]
- Length: [cm]

COMPRESSION VIEWS:
- [Describe findings]

IMPRESSION: [Detailed mucosal findings].`
  },

  // ==================== LARGE BOWEL ====================
  {
    title: "Barium Enema - Single Contrast",
    category: "Fluoroscopy GI",
    bodyPart: "Colon",
    description: "Single contrast barium enema",
    modality: "Fluoroscopy",
    tags: "barium enema,colon,single contrast",
    content: `BARIUM ENEMA (SINGLE CONTRAST) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Barium administered per rectum with fluoroscopic guidance.

FINDINGS:
COLON:
- Rectum: [normal/abnormal]
- Sigmoid: [normal/redundant/tortuous]
- Descending colon: [normal/abnormal]
- Splenic flexure: [reached/abnormal]
- Transverse colon: [normal/abnormal]
- Hepatic flexure: [reached/abnormal]
- Ascending colon: [normal/abnormal]
- Cecum: [filled/abnormal]

OVERALL CALIBER:
- Normal: [yes/no]
- Dilated: [segment]
- Narrowed: [segment]

FILLING DEFECTS:
- Present: [yes/no]
- Location: [describe]
- Size: [mm]

STRICTURES:
- Present: [yes/no]
- Location: [describe]
- Length: [cm]

DIVERTICULA: [present/absent - location]

ILEOCECAL VALVE: [normal/abnormal]

APPENDIX: [filled/not filled]

IMPRESSION: [Primary findings]. [Mass/stricture/diverticula if present].`
  },
  {
    title: "Barium Enema - Double Contrast",
    category: "Fluoroscopy GI",
    bodyPart: "Colon",
    description: "Double contrast barium enema for mucosal detail",
    modality: "Fluoroscopy",
    tags: "barium enema,colon,double contrast,mucosal",
    content: `BARIUM ENEMA (DOUBLE CONTRAST) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Double contrast technique with barium and air insufflation.

FINDINGS:
MUCOSAL COATING: [excellent/good/fair]

COLONIC SEGMENTS:
- Rectum: [normal/abnormal]
- Sigmoid: [normal/diverticula/redundant]
- Descending colon: [normal/abnormal]
- Splenic flexure: [normal/abnormal]
- Transverse colon: [normal/abnormal]
- Hepatic flexure: [normal/abnormal]
- Ascending colon: [normal/abnormal]
- Cecum: [normal/abnormal]

LESIONS:
- Polyps: [present/absent - size, morphology, location]
  - Sessile/pedunculated: [describe]
  - Size: [mm]
- Mass: [present/absent - size, location, features]
- Ulceration: [present/absent]

DIVERTICULA:
- Present: [yes/no]
- Location: [sigmoid/left/right colon]
- Severity: [mild/moderate/severe]

INFLAMMATORY CHANGES:
- Mucosal granularity: [present/absent]
- Ulceration: [present/absent]
- Thumbprinting: [present/absent]

ILEOCECAL VALVE: [normal/lipomatous/abnormal]

IMPRESSION: [Mucosal findings]. [Polyp/mass detection]. [Diverticulosis]. [Recommend colonoscopy for polypectomy].`
  },
  {
    title: "Barium Enema - Polyp/Mass Evaluation",
    category: "Fluoroscopy GI",
    bodyPart: "Colon",
    description: "Detailed polyp and mass assessment",
    modality: "Fluoroscopy",
    tags: "barium enema,polyp,mass,colon cancer",
    content: `BARIUM ENEMA - POLYP/MASS EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
POLYPS:
- Location: [segment]
- Number: [single/multiple]
- Size: [mm]
- Morphology:
  - Sessile: [yes/no]
  - Pedunculated: [yes/no - stalk length]
  - Flat: [yes/no]
- Surface: [smooth/lobulated/irregular]

MASS:
- Location: [segment]
- Size: [cm]
- Morphology: [polypoid/ulcerated/infiltrating]
- Margins: [smooth/irregular]
- Apple-core appearance: [present/absent]

CARCINOMA FEATURES:
- Circumferential: [yes/no]
- Shouldered margins: [yes/no]
- Mucosal destruction: [present/absent]

SIZE CRITERIA FOR MALIGNANCY RISK:
- <5mm: Low risk
- 5-10mm: Intermediate risk
- >10mm: Higher risk

OTHER LESIONS: [describe]

IMPRESSION: [Polyp/mass description]. [Size and morphology]. [Recommend colonoscopy].`
  },
  {
    title: "Barium Enema - Stricture Evaluation",
    category: "Fluoroscopy GI",
    bodyPart: "Colon",
    description: "Evaluation of colonic stricture",
    modality: "Fluoroscopy",
    tags: "barium enema,stricture,colon",
    content: `BARIUM ENEMA - STRUCTURE EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
STRUCTURE:
- Location: [segment]
- Length: [cm]
- Diameter: [mm]
- Margins: [smooth/tapered/irregular/shouldered]

BENIGN VS MALIGNANT:
Benign features:
- Smooth margins: [present/absent]
- Tapered ends: [present/absent]
- Short length: [yes/no]

Malignant features:
- Irregular margins: [present/absent]
- Shouldered margins (apple-core): [present/absent]
- Mucosal destruction: [present/absent]

PROXIMAL DILATATION: [present/absent]

ETIOLOGY:
- Diverticular: [likely/unlikely]
- Ischemic: [likely/unlikely]
- Malignant: [likely/unlikely]
- Anastomotic: [if post-surgical]
- Inflammatory: [likely/unlikely]

PASSAGE OF CONTRAST:
- Through stricture: [complete/partial/absent]

IMPRESSION: [Stricture description]. [Benign vs malignant assessment]. [Degree of obstruction].`
  },
  {
    title: "Barium Enema - Volvulus Evaluation",
    category: "Fluoroscopy GI",
    bodyPart: "Colon",
    description: "Evaluation for colonic volvulus",
    modality: "Fluoroscopy",
    tags: "barium enema,volvulus,obstruction,colon",
    content: `BARIUM ENEMA - VOLVULUS EVALUATION

CLINICAL INDICATION: [Indication - suspected volvulus]

FINDINGS:
SIGMOID VOLVULUS:
- Coffee bean sign: [present/absent]
- Bird's beak: [present - point of torsion]
- Massive dilation: [present]
- Location: [abdomen, pointing to RUQ]

CECAL VOLVULUS:
- Dilated cecum: [present]
- Location: [left upper quadrant or epigastrium]
- Coffee bean: [may be present]
- Bird's beak: [at point of torsion]

TRANSVERSE COLON VOLVULUS:
- Rare, [describe if present]

BARIUM COLUMN:
- Arrested at: [point of obstruction]
- Bird's beak configuration: [present/absent]

PROXIMAL BOWEL:
- Dilated: [yes/no]
- Air-fluid levels: [on preliminary film]

ISCHEMIA SIGNS:
- Thumbprinting: [present/absent]
- Pneumatosis: [not seen on BE]

IMPRESSION: [Volvulus type if present]. [Point of torsion]. [Recommend decompression].`
  },
  {
    title: "Defecography - Complete Study",
    category: "Fluoroscopy GI",
    bodyPart: "Pelvis",
    description: "Dynamic defecography study",
    modality: "Fluoroscopy",
    tags: "defecography,pelvic floor,dysfunction,rectocele",
    content: `DEFECography - REPORT

CLINICAL INDICATION: [Indication - constipation, incontinence]

TECHNIQUE: Rectal contrast administered. Dynamic fluoroscopy during evacuation.

FINDINGS:
AT REST:
- Anorectal angle: [degrees] - normal 90-100°
- Puborectalis: [relaxed/contracted]
- Rectal configuration: [normal/abnormal]

SQUEEZE:
- Anorectal angle: [degrees] - decreases
- Puborectalis contraction: [present/absent]
- Anal canal length: [increased/normal]

STRAINING/EVACUATION:
- Anorectal angle: [degrees] - increases
- Perineal descent: [normal/excessive >4cm]
- Evacuation: [complete/incomplete]

PELVIC FLOOR ABNORMALITIES:
- Rectocele: [present/absent]
  - Size: [cm depth]
  - Emptying: [complete/incomplete]
- Enterocele: [present/absent]
- Sigmoidocele: [present/absent]
- Rectal intussusception: [present/absent]
  - Grade: [I/II/III - rectal/anal/external]
- Rectal prolapse: [present/absent]

ANISMUS/PARADOXICAL CONTRACTION:
- Puborectalis: [relaxes/contracts during strain]

IMPRESSION: [Pelvic floor dysfunction]. [Rectocele/enterocele/intussusception]. [Recommendations].`
  },
  {
    title: "Defecography - Pelvic Floor Dynamics",
    category: "Fluoroscopy GI",
    bodyPart: "Pelvis",
    description: "Focus on pelvic floor movement",
    modality: "Fluoroscopy",
    tags: "defecography,pelvic floor,dynamics",
    content: `DEFECography - PELVIC FLOOR DYNAMICS

CLINICAL INDICATION: [Indication]

FINDINGS:
ANORECTAL ANGLE:
- At rest: [degrees]
- During squeeze: [degrees]
- During strain: [degrees]

PUBORECTALIS FUNCTION:
- At rest: [normal]
- Squeeze: [contracts normally/weak]
- Strain: [relaxes normally/paradoxical contraction]

PERINEAL DESCENT:
- At rest: [position]
- During strain: [descent cm]
- Excessive descent: [>4cm yes/no]

PELVIC FLOOR MOTION:
- Normal: [yes/no]
- Hypomobile: [yes/no]
- Hypobile: [yes/no]

ANO-RECTAL JUNCTION POSITION:
- At rest relative to PCL: [above/at/below]
- During strain: [descent measurement]

IMPRESSION: [Pelvic floor dynamics assessment]. [Dyssynergy if present].`
  },
  {
    title: "Defecography - Rectocele Assessment",
    category: "Fluoroscopy GI",
    bodyPart: "Pelvis",
    description: "Detailed rectocele evaluation",
    modality: "Fluoroscopy",
    tags: "defecography,rectocele,anterior,posterior",
    content: `DEFECography - RECTOCELE ASSESSMENT

CLINICAL INDICATION: [Indication]

FINDINGS:
RECTOCELE:
- Present: [yes/no]
- Type: [anterior/posterior/lateral]
- Size: [cm depth from expected rectal wall]
  - Small: <2cm
  - Moderate: 2-4cm
  - Large: >4cm

LOCATION:
- Distance from anal verge: [cm]

EMPTYING:
- Spontaneous: [yes/no]
- Requires digital assistance: [yes/no - if history provided]
- Residual barium: [amount]

ASSOCIATED FINDINGS:
- Enterocele: [present/absent - fills rectocele during strain]
- Rectal intussusception: [present/absent]
- Vaginal contrast: [if performed, findings]

SYMPTOMS CORRELATION:
- Digit evacuation: [reported/not reported]

IMPRESSION: [Rectocele size and type]. [Emptying function]. [Clinical significance].`
  },

  // ==================== HEPATOBILIARY ====================
  {
    title: "ERCP - CBD Stones",
    category: "Fluoroscopy Hepatobiliary",
    bodyPart: "Biliary Tree",
    description: "ERCP for common bile duct stones",
    modality: "Fluoroscopy",
    tags: "ercp,cbd stones,choledocholithiasis,biliary",
    content: `ERCP - CBD STONES - REPORT

CLINICAL INDICATION: [Indication - suspected CBD stones]

PROCEDURE: Endoscopic retrograde cholangiopancreatography.

FINDINGS:
BILIARY TREE:
- CBD diameter: [mm] - normal <8mm
- CHD: [normal/dilated]
- Intrahepatic ducts: [normal/dilated]

FILLING DEFECTS:
- Location: [CBD/CHD/cystic duct]
- Number: [single/multiple]
- Size: [mm]
- Mobility: [mobile/fixed]

CYSTIC DUCT:
- Patent: [yes/no]
- Filling defect: [present/absent]

GALLBLADDER:
- Opacified: [yes/no]
- Stones: [present/absent if visualized]

PANCREATIC DUCT:
- Filled: [yes/no]
- Normal/abnormal: [describe]

SPHINCTER OF ODDI:
- [Normal/appearance]

IMPRESSION: [Choledocholithiasis present/absent]. [Stone burden]. [Recommend stone extraction].`
  },
  {
    title: "ERCP - Biliary Stricture",
    category: "Fluoroscopy Hepatobiliary",
    bodyPart: "Biliary Tree",
    description: "ERCP for biliary stricture evaluation",
    modality: "Fluoroscopy",
    tags: "ercp,stricture,biliary,cholangiocarcinoma",
    content: `ERCP - BILIARY STRUCTURE - REPORT

CLINICAL INDICATION: [Indication - biliary obstruction]

PROCEDURE: Endoscopic retrograde cholangiopancreatography.

FINDINGS:
STRUCTURE:
- Location: [distal CBD/mid CBD/proximal CBD/hilar - Bismuth type]
- Length: [cm]
- Diameter: [mm residual lumen]

APPEARANCE:
- Smooth: [yes/no - benign suggestion]
- Irregular: [yes/no - malignant suggestion]
- Shouldered: [yes/no]

PROXIMAL DILATATION: [present/absent, degree]

INTRAHEPATIC DUCTS:
- Right: [dilated/normal]
- Left: [dilated/normal]
- Severity: [mild/moderate/severe]

BENIGN VS MALIGNANT:
- Benign: smooth, short, tapered
- Malignant: irregular, shouldered, long

BIopsy/BRUSH CYTOLOGY: [obtained - results pending]

IMPRESSION: [Stricture description]. [Benign vs malignant features]. [Stent placed/pending results].`
  },
  {
    title: "ERCP - Stenting",
    category: "Fluoroscopy Hepatobiliary",
    bodyPart: "Biliary Tree",
    description: "ERCP with biliary stent placement",
    modality: "Fluoroscopy",
    tags: "ercp,stent,biliary,stenting",
    content: `ERCP - BILIARY STENTING - REPORT

CLINICAL INDICATION: [Indication]

PROCEDURE: ERCP with biliary stent placement.

FINDINGS:
PRE-STENT:
- CBD diameter: [mm]
- Stricture location: [describe]
- Stricture length: [cm]

STENT:
- Type: [plastic/metal - covered/uncovered]
- Size: [diameter x length]
- Position: [appropriate - across stricture]
- Proximal end: [location]
- Distal end: [in duodenum]

POST-STENT CHOLANGIOGRAM:
- Flow: [good through stent]
- Residual filling defect: [present/absent]
- Proximal ducts: [decompression achieved]

COMPLICATIONS:
- Perforation: [none/suspected]
- Bleeding: [none/minimal/significant]
- Pancreatitis risk: [discussed]

FOLLOW-UP: [plastic stent - change in 3 months/metal stent - as needed]

IMPRESSION: [Stent placed successfully]. [Position adequate]. [Biliary decompression achieved].`
  },
  {
    title: "ERCP - Post Procedure",
    category: "Fluoroscopy Hepatobiliary",
    bodyPart: "Biliary Tree",
    description: "Post-ERCP evaluation",
    modality: "Fluoroscopy",
    tags: "ercp,post procedure,follow up",
    content: `ERCP - POST PROCEDURE FOLLOW-UP

CLINICAL INDICATION: [Indication - follow-up ERCP]

PREVIOUS PROCEDURE: [Date and type]

FINDINGS:
STENT (if present):
- Position: [unchanged/migrated]
- Patency: [patent/occluded]
- Encrustation: [present/absent]

BILIARY TREE:
- Dilation: [improved/unchanged/worsened]
- Residual stones: [present/absent]
- Stricture: [unchanged/improved/worsened]

CONTRAST DRAINAGE:
- Good: [yes/no]
- Delayed: [yes/no]

COMPLICATIONS:
- Cholangitis: [signs present/absent]
- Stent migration: [present/absent]
- Stent occlusion: [present/absent]

INTERVENTION:
- Stent exchange: [performed/not needed]
- Stone extraction: [performed/not needed]
- Dilatation: [performed/not needed]

IMPRESSION: [Status post ERCP]. [Stent function]. [Further management plan].`
  },
  {
    title: "T-Tube Cholangiography",
    category: "Fluoroscopy Hepatobiliary",
    bodyPart: "Biliary Tree",
    description: "Post-cholecystectomy T-tube study",
    modality: "Fluoroscopy",
    tags: "t-tube,cholangiography,post cholecystectomy,biliary",
    content: `T-TUBE CHOLANGIOGRAPHY - REPORT

CLINICAL INDICATION: [Indication - post-cholecystectomy evaluation]

TECHNIQUE: Contrast injected through T-tube under fluoroscopic guidance.

FINDINGS:
T-TUBE POSITION:
- Location: [appropriate/malpositioned]
- Side holes: [in CBD/one outside]

BILIARY TREE:
- CBD: [normal diameter/dilated/narrowed]
- CHD: [normal/abnormal]
- Intrahepatic ducts: [normal/dilated]

FILLING DEFECTS:
- Residual stones: [present/absent - number, size, location]

CONTRAST FLOW:
- Into duodenum: [free/impaired/obstructed]
- Sphincter of Oddi: [patent/abnormal]

BILIARY LEAK:
- Present: [yes/no]
- Location: [cystic duct stump/CBD/other]
- Size: [describe]

EXTRAVASATION:
- Present: [yes/no]
- Location: [describe]

COLLECTION: [present/absent]

IMPRESSION: [T-tube position]. [Biliary tree status]. [Leak/stones if present]. [T-tube removal recommendation].`
  },
  {
    title: "T-Tube Cholangiography - Biliary Leak",
    category: "Fluoroscopy Hepatobiliary",
    bodyPart: "Biliary Tree",
    description: "T-tube study for suspected biliary leak",
    modality: "Fluoroscopy",
    tags: "t-tube,biliary leak,leak,postoperative",
    content: `T-TUBE CHOLANGIOGRAPHY - BILIARY LEAK ASSESSMENT

CLINICAL INDICATION: [Indication - suspected biliary leak post-cholecystectomy]

FINDINGS:
EXTRAVASATION:
- Present: [yes/no]
- Origin: [cystic duct stump/Luschka ducts/CBD injury/site unclear]
- Size: [small/moderate/large]
- Pattern: [contained/free]

COLLECTION:
- Biloma: [present/absent]
- Location: [subhepatic/right subphrenic/other]
- Size: [cm]

BILIARY TREE:
- Proximal: [dilated/normal]
- Distal: [obstruction may cause leak]

CONTRAST FLOW TO DUODENUM:
- Free: [yes/no]
- Impaired: [yes/no]

T-TUBE:
- Position: [described]
- Side hole location: [inside/outside CBD]

MANAGEMENT:
- Drain in place: [yes/no]
- Sphincterotomy: [may benefit]
- Stent: [may benefit]

IMPRESSION: [Biliary leak present/absent]. [Location and size]. [Management recommendations].`
  },

  // ==================== GENITOURINARY ====================
  // MCU (Micturating Cystourethrogram)
  {
    title: "MCU (Micturating Cystourethrogram)",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "Standard micturating cystourethrogram",
    modality: "Fluoroscopy",
    tags: "mcu,vcug,cystourethrogram,voiding",
    content: `MICTURATING CYSTOURETHROGRAM (MCU) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Bladder catheterized and filled with contrast. Images obtained during filling and voiding.

FINDINGS:
BLADDER:
- Capacity: [ml]
- Contour: [smooth/trabeculated/diverticula]
- Filling defects: [present/absent]
- Ureteroceles: [present/absent]

URETHRA:
- Male: Posterior urethra [normal/dilated], Anterior urethra [normal/strictures]
- Female: Urethra [normal/abnormal]

VESICOURETERAL REFLUX:
- Present: [yes/no]
- Grade (International Reflux Study):
  - Right: [I/II/III/IV/V]
  - Left: [I/II/III/IV/V]
- Grade descriptions:
  - I: Ureter only
  - II: Ureter, pelvis, no dilatation
  - III: Mild dilatation/tortuosity
  - IV: Moderate dilatation, blunted calyces
  - V: Severe dilatation, tortuous ureter

INTRARENAL REFLUX: [present/absent]

VOIDING:
- Complete: [yes/no]
- Residual: [ml estimated]

URETHRAL ABNORMALITIES:
- Posterior urethral valves: [present/absent]
- Strictures: [present/absent]

IMPRESSION: [VUR status and grade]. [Urethral abnormalities]. [Bladder findings].`
  },
  {
    title: "MCU - Vesicoureteral Reflux Grading",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "Detailed VUR grading study",
    modality: "Fluoroscopy",
    tags: "mcu,vur,reflux,grading",
    content: `MCU - VESICOURETERAL REFLUX GRADING

CLINICAL INDICATION: [Indication - UTI, VUR follow-up]

FINDINGS:
INTERNATIONAL REFLUX STUDY CLASSIFICATION:

RIGHT KIDNEY:
- Reflux: [present/absent]
- Grade: [0/I/II/III/IV/V]
- Reached: [ureter/renal pelvis]
- Calyceal blunting: [none/mild/moderate/severe]
- Ureter dilatation: [none/mild/moderate/severe]
- Tortuosity: [absent/present]

LEFT KIDNEY:
- Reflux: [present/absent]
- Grade: [0/I/II/III/IV/V]
- Reached: [ureter/renal pelvis]
- Calyceal blunting: [none/mild/moderate/severe]
- Ureter dilatation: [none/mild/moderate/severe]
- Tortuosity: [absent/present]

REFLUX TIMING:
- During filling: [yes/no]
- During voiding: [yes/no]

HIGH PRESSURE VS LOW PRESSURE:
- [Assessment]

INTRARENAL REFLUX: [present/absent - associated with higher risk of renal damage]

COMPARISON: [With prior MCU if available]

IMPRESSION: [VUR grade right/left]. [Change from prior study]. [Management recommendations].`
  },
  {
    title: "MCU - Posterior Urethral Valves (PUV)",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "MCU for posterior urethral valve evaluation",
    modality: "Fluoroscopy",
    tags: "mcu,puv,posterior urethral valves,pediatric",
    content: `MCU - POSTERIOR URETHRAL VALVES EVALUATION

CLINICAL INDICATION: [Indication - male infant, voiding dysfunction]

FINDINGS:
POSTERIOR URETHRA:
- Dilatation: [present/absent]
- Appearance: [wide, elongated]
- Valve leaflets: [visualized/suggested]
- Verumontanum: [prominent]

MEMBRANOUS URETHRA:
- Transition: [abrupt at valves]

ANTERIOR URETHRA: [normal/narrowed]

BLADDER:
- Trabeculation: [present/absent - severity]
- Diverticula: [present/absent]
- Capacity: [ml - may be thickened wall]

VESICOURETERAL REFLUX:
- Present: [yes/no - often secondary to PUV]
- Grade: [describe]

URACHUS: [patent/diverticulum]

VOIDING:
- Stream: [weak/dribbling/normal after valve ablation]

POST-VOID RESIDUAL: [ml]

IMPRESSION: [PUV findings]. [Secondary changes]. [Post-ablation status if applicable].`
  },
  {
    title: "MCU - Pediatric",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "Pediatric MCU with age-appropriate assessment",
    modality: "Fluoroscopy",
    tags: "mcu,pediatric,child,infant",
    content: `PEDIATRIC MCU - REPORT

CLINICAL INDICATION: [Indication - UTI, VUR screening]

TECHNIQUE: Catheterization with contrast, fluoroscopy during filling and voiding.

FINDINGS:
BLADDER:
- Capacity: [ml] - age appropriate?
- Contour: [smooth/trabeculated]
- Wall thickness: [normal/increased]

URETHRA:
- [Normal for age/abnormalities]

VESICOURETERAL REFLUX:
- Right: [Grade 0-V]
- Left: [Grade 0-V]

CONGENITAL ANOMALIES:
- Diverticula: [present/absent]
- Ureterocele: [present/absent]
- Duplex system: [suggested/not seen]

POSTERIOR URETHRAL VALVES (MALE):
- [Not seen/present]

VOIDING:
- Complete/incomplete
- Post-void residual: [estimated]

RADIATION DOSE: [Minimized with appropriate technique]

IMPRESSION: [VUR grade]. [Bladder/urethral findings]. [Follow-up recommendation].`
  },
  {
    title: "MCU - Bladder Dynamics",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "MCU with bladder dynamics assessment",
    modality: "Fluoroscopy",
    tags: "mcu,bladder,dynamics,dysfunction",
    content: `MCU - BLADDER DYNAMICS

CLINICAL INDICATION: [Indication - voiding dysfunction]

FINDINGS:
BLADDER CAPACITY:
- Maximum capacity: [ml]
- First sensation: [ml] (if cooperative)
- Normal capacity estimate: (age + 2) × 30 ml for children

BLADDER WALL:
- Smooth: [yes/no]
- Trabeculation: [none/mild/moderate/severe]
- Saccules/diverticula: [present/absent]

FILLING PHASE:
- Bladder compliance: [normal/reduced]
- Detrusor overactivity: [suggested/not seen]

VOIDING PHASE:
- Opening pressure: [assessed]
- Stream: [continuous/intermittent]
- Flow: [good/reduced]

COORDINATION:
- Bladder-sphincter dyssynergia: [suggested/not seen]

POST-VOID:
- Residual: [ml]

IMPRESSION: [Bladder dynamics assessment]. [Dysfunction type if present].`
  },

  // RGU (Retrograde Urethrogram)
  {
    title: "RGU (Retrograde Urethrogram) - Complete",
    category: "Fluoroscopy GU",
    bodyPart: "Urethra",
    description: "Retrograde urethrogram",
    modality: "Fluoroscopy",
    tags: "rgu,retrograde urethrogram,urethra,male",
    content: `RETROGRADE URETHROGRAM (RGU) - REPORT

CLINICAL INDICATION: [Indication - stricture, trauma]

TECHNIQUE: Contrast injected retrograde through urethral meatus.

FINDINGS:
ANTERIOR URETHRA:
- Penile urethra: [normal/strictures/filling defects]
- Bulbar urethra: [normal/strictures/filling defects]

POSTERIOR URETHRA:
- Membranous urethra: [normal/narrowed]
- Prostatic urethra: [normal/dilated]

STRUCTURES:
- Location: [penile/bulbar/membranous/prostatic]
- Length: [cm]
- Diameter: [mm]
- Number: [single/multiple]

URETHRAL INJURY (if trauma):
- Classification: [I/II/III/IV/V]
- Contrast extravasation: [present/absent]

FILLING DEFECTS:
- Stones: [present/absent]
- Tumors: [present/absent]
- Urethral diverticulum: [present/absent]

COWPER'S GLAND: [opacified/normal]

PROSTATIC UTRICLE: [opacified/normal]

IMPRESSION: [Urethral stricture location and extent]. [Trauma findings if applicable].`
  },
  {
    title: "RGU - Urethral Stricture Assessment",
    category: "Fluoroscopy GU",
    bodyPart: "Urethra",
    description: "Detailed urethral stricture evaluation",
    modality: "Fluoroscopy",
    tags: "rgu,urethral stricture,stricture",
    content: `RGU - URETHRAL STRUCTURE ASSESSMENT

CLINICAL INDICATION: [Indication - stricture follow-up]

FINDINGS:
STRUCTURE:
- Location: [meatus/penile/bulbar/membranous/posterior]
- Length: [cm]
- Caliber: [mm]
- Number: [single/multiple]

ETIOLOGY SUGGESTED:
- Traumatic: [short, usually membranous]
- Inflammatory: [longer, may be multiple]
- Iatrogenic: [at catheter sites]
- Lichen sclerosus: [meatal/penile, multi-focal]

UPSTREAM DILATATION: [present/absent - severity]

CONTRAST FLOW:
- Into bladder: [yes/no]

WITH MCUG (COMBINED):
- Total stricture length: [cm]

PRIOR INTERVENTIONS:
- Visual internal urethrotomy: [changes]
- Urethroplasty: [anastomotic stricture/normal]

COMPARISON: [With prior study]

IMPRESSION: [Stricture parameters]. [Change from prior]. [Treatment planning].`
  },
  {
    title: "RGU - Urethral Trauma",
    category: "Fluoroscopy GU",
    bodyPart: "Urethra",
    description: "RGU for urethral trauma evaluation",
    modality: "Fluoroscopy",
    tags: "rgu,trauma,urethral injury,pelvic fracture",
    content: `RGU - URETHRAL TRAUMA EVALUATION

CLINICAL INDICATION: [Indication - trauma, blood at meatus]

FINDINGS:
CONTRAST EXTRAVASATION:
- Present: [yes/no]
- Location: [above/below urogenital diaphragm]

INJURY CLASSIFICATION:
- Type I: [Stretched urethra, intact]
- Type II: [Above UG diaphragm - membranous/prostatic]
- Type III: [Above and below UG diaphragm - most common]
- Type IV: [Bladder neck injury]
- Type V: [Anterior urethral injury]

URETHRAL DISRUPTION:
- Complete: [yes/no]
- Partial: [yes/no]

CONTRAST IN BLADDER:
- Reached: [yes/no - partial vs complete]

ASSOCIATED INJURIES:
- Pelvic fracture: [present - review imaging]
- Bladder injury: [suspected/not suspected]

FOLLOW-UP:
- Delayed RGU after catheter: [recommended]

IMPRESSION: [Urethral injury type]. [Partial vs complete]. [Management recommendation].`
  },

  // Cystography
  {
    title: "Cystography - Bladder Rupture",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "Cystogram for bladder rupture evaluation",
    modality: "Fluoroscopy",
    tags: "cystogram,bladder rupture,trauma",
    content: `CYSTOGRAM - BLADDER RUPTURE EVALUATION

CLINICAL INDICATION: [Indication - trauma, suspected bladder injury]

TECHNIQUE: Bladder filled with contrast via catheter. Minimum 300ml for adequate distension.

FINDINGS:
BLADDER:
- Contour: [normal/irregular]
- Capacity: [ml filled]

EXTRAVASATION:
- Present: [yes/no]
- Type:
  - Intraperitoneal: [contrast outlines bowel loops, collects in paracolic gutters]
  - Extraperitoneal: [contrast in perivesical space, flame-shaped]

SITE OF RUPTURE:
- Dome: [intraperitoneal typical]
- Base/trigone: [extraperitoneal typical]

DEGREE:
- Small: [minimal extravasation]
- Moderate: [significant extravasation]
- Large: [massive extravasation]

PELVIC FRACTURES: [associated - review plain films/CT]

URETHRAL INJURY: [suggested/not suggested - may need RGU]

POST-DRAINAGE FILM: [residual extravasation - describe]

IMPRESSION: [Bladder rupture type - intraperitoneal/extraperitoneal/combined]. [Severity]. [Surgical management indication].`
  },
  {
    title: "Cystography - Fistula Evaluation",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "Cystogram for fistula detection",
    modality: "Fluoroscopy",
    tags: "cystogram,fistula,vesicovaginal,vesicoenteric",
    content: `CYSTOGRAM - FISTULA EVALUATION

CLINICAL INDICATION: [Indication - suspected fistula]

FINDINGS:
BLADDER:
- Filling: [adequate]
- Contour: [normal/abnormal]

FISTULA:
- Present: [yes/no]
- Type:
  - Vesicovaginal: [contrast in vagina]
  - Vesicoenteric: [contrast in bowel]
  - Vesicocutaneous: [contrast tracks to skin]

FISTULA CHARACTERISTICS:
- Location: [bladder site]
- Size: [mm width of track]
- Destination: [describe]

DELAYED IMAGES:
- Additional findings: [describe]

ASSOCIATED CONDITIONS:
- Diverticulitis: [underlying cause]
- Malignancy: [underlying cause]
- Post-surgical: [underlying cause]

IMPRESSION: [Fistula present/absent]. [Type and location]. [Underlying etiology].`
  },
  {
    title: "Cystography - Post-Surgical",
    category: "Fluoroscopy GU",
    bodyPart: "Bladder",
    description: "Post-surgical cystogram",
    modality: "Fluoroscopy",
    tags: "cystogram,postoperative,surgery",
    content: `CYSTOGRAM - POST-SURGICAL EVALUATION

CLINICAL INDICATION: [Indication]
SURGERY: [Type - cystectomy with neobladder, augmentation, repair]

FINDINGS:
BLADDER/NEOBLADDER:
- Capacity: [ml]
- Contour: [describe surgical anatomy]
- Suture lines: [intact/dehisced]

LEAK:
- Present: [yes/no]
- Location: [anastomotic site/dome/other]
- Size: [small/moderate/large]

URETERS:
- Reflux: [present/absent]
- Anastomosis: [intact/leaking]

CONTINENCE MECHANISM: [assessed if applicable]

VOIDING:
- Attempted: [yes/no]
- Success: [complete/partial/failed]

POST-VOID: [residual contrast]

IMPRESSION: [Post-surgical anatomy]. [Leak present/absent]. [Healing status].`
  },

  // IVU (Intravenous Urography)
  {
    title: "IVU (Intravenous Urography)",
    category: "Fluoroscopy GU",
    bodyPart: "Urinary Tract",
    description: "Standard intravenous urography",
    modality: "Fluoroscopy",
    tags: "ivu,ivp,intravenous urography,urinary tract",
    content: `INTRAVENOUS UROGRAPHY (IVU) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: IV contrast administered. Serial abdominal films obtained.

FINDINGS:
KIDNEYS:
- Right: Size [cm], Position [normal], Shape [normal]
- Left: Size [cm], Position [normal], Shape [normal]
- Nephrogram: [symmetric/delayed/poor]

CALYCES:
- Right: [sharp cups/blunted/distorted]
- Left: [sharp cups/blunted/distorted]

PELVES:
- Right: [normal/dilated]
- Left: [normal/dilated]

URETERS:
- Right: [visualized throughout, normal/dilated/filling defect]
- Left: [visualized throughout, normal/dilated/filling defect]

BLADDER:
- Filling: [adequate]
- Contour: [smooth/trabeculated/filling defects]

DENSITY OF CONTRAST:
- Normal concentration: [yes/no]
- Delayed excretion: [yes/no - side]

TIMING:
- Nephrogram phase: [normal/delayed]
- Calyceal opacification: [normal/delayed - minutes]

IMPRESSION: [Urinary tract findings]. [Obstruction/stone/mass if present].`
  },
  {
    title: "IVU - Obstruction Evaluation",
    category: "Fluoroscopy GU",
    bodyPart: "Kidneys",
    description: "IVU for urinary obstruction",
    modality: "Fluoroscopy",
    tags: "ivu,obstruction,hydronephrosis,upjo",
    content: `IVU - OBSTRUCTION EVALUATION

CLINICAL INDICATION: [Indication - suspected obstruction]

FINDINGS:
DELAYED NEPHROGRAM:
- Right: [normal/delayed - minutes]
- Left: [normal/delayed - minutes]

CALYCEAL OPACIFICATION:
- Right: [time - normal/delayed]
- Left: [time - normal/delayed]

DILATATION:
- Right pelvis: [normal/mild/moderate/severe]
- Left pelvis: [normal/mild/moderate/severe]
- Right calyces: [sharp/blunted]
- Left calyces: [sharp/blunted]

URETER:
- Dilated: [right/left/none]
- Level of obstruction: [PUJ/ureteric/vesicoureteric junction]

OBSTRUCTION SIGNS:
- Delayed nephrogram: [present/absent]
- Increasing density: [obstructive nephrogram - present/absent]
- Forneiceal rupture: [contrast extravasation]

CAUSE:
- Calculus: [identified/not seen]
- Stricture: [suggested/not suggested]
- Extrinsic compression: [suggested/not suggested]

DELAYED FILMS: [findings at 6/12/24 hours if obtained]

IMPRESSION: [Obstruction present/absent]. [Level and side]. [Cause if identified].`
  },
  {
    title: "IVU - Calculus Disease",
    category: "Fluoroscopy GU",
    bodyPart: "Kidneys",
    description: "IVU for renal/ureteric calculi",
    modality: "Fluoroscopy",
    tags: "ivu,calculus,stone,kidney stone",
    content: `IVU - CALCULUS EVALUATION

CLINICAL INDICATION: [Indication - renal colic]

FINDINGS:
PRE-CONTRAST (PLAIN FILM):
- Calculi visible: [yes/no]
- Location: [kidney/ureter/bladder]
- Size: [mm]

POST-CONTRAST:
RENAL CALCULI:
- Right: [number, size, location - pelvis/calyx]
- Left: [number, size, location]

URETERIC CALCULI:
- Location: [upper/mid/lower ureter]
- Side: [right/left]
- Size: [mm]
- Obstruction: [present/absent - degree]

OBSTRUCTION SIGNS:
- Hydronephrosis: [grade]
- Hydroureter: [present/absent]
- Delayed nephrogram: [present/absent]
- Forneiceal rupture: [present/absent]

BLADDER CALCULI: [present/absent]

CONTRAST PASSAGE:
- Beyond calculus: [yes/no]

IMPRESSION: [Stone burden]. [Location]. [Obstruction degree]. [Note: CT KUB is now preferred for renal colic].`
  },
  {
    title: "IVU - Congenital Anomaly",
    category: "Fluoroscopy GU",
    bodyPart: "Kidneys",
    description: "IVU for congenital urinary tract anomalies",
    modality: "Fluoroscopy",
    tags: "ivu,congenital,anomaly,duplex",
    content: `IVU - CONGENITAL ANOMALY EVALUATION

CLINICAL INDICATION: [Indication]

FINDINGS:
KIDNEYS:
- Number: [solitary/bilateral/supernumerary]
- Position: [normal/ectopic - pelvic/thoracic]
- Rotation: [normal/malrotated]
- Fusion: [horseshoe kidney/crossed ectopia]

DUPLICITY:
- Complete: [two ureters, two ureteric orifices]
- Incomplete: [two ureters join before bladder]
- Side: [right/left/bilateral]
- Weigert-Meyer rule: [upper pole ureter inserts inferior/medial]

URETER:
- Course: [normal/retrocaval/ureterocele]
- Megaureter: [present/absent - obstructive/refluxing]

URETEROCELE:
- Present: [yes/no]
- Type: [orthotopic/ectopic]
- Size: [cm]

CYSTIC DISEASE: [multicystic dysplastic/polycystic - suggested]

MEDULLARY SPONGE KIDNEY: [contrast in papillary ducts - present/absent]

IMPRESSION: [Congenital anomaly description]. [Functional assessment].`
  },

  // ==================== MUSCULOSKELETAL ====================
  // Arthrography with laterality
  ...withLaterality(
    "Arthrography - Shoulder",
    "Shoulder",
    `SHOULDER ARTHROGRAPHY ([LATERALITY]) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: [Lateral] shoulder joint accessed under fluoroscopic guidance. Contrast injected.

FINDINGS:
JOINT CAPSULE:
- Capacity: [normal/increased]
- Distension: [adequate]

CONTRAST DISTRIBUTION:
- Glenohumeral joint: [filled]
- Biceps tendon sheath: [filled - normal]
- Subacromial bursa: [normally NOT filled]
- Axillary pouch: [filled]

ROTATOR CUFF TEAR:
- Contrast in subacromial bursa: [present/absent - indicates full-thickness tear]
- Tear size: [if present]

LABRAL ABNORMALITIES:
- Bankart lesion: [suggested/not seen]
- SLAP lesion: [suggested/not seen]

ADHESIVE CAPSULITIS:
- Reduced capacity: [yes/no]
- Tight capsule: [yes/no]

COMPLICATIONS: [none/hemarthrosis/infection risk]

IMPRESSION: [Findings]. [Rotator cuff/labral status]. [Recommend MR arthrography for labral evaluation].`,
    "arthrography,shoulder,joint,rotator cuff",
    "Fluoroscopic shoulder arthrography"
  ),
  ...withLaterality(
    "Arthrography - Hip",
    "Hip",
    `HIP ARTHROGRAPHY ([LATERALITY]) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: [Lateral] hip joint accessed under fluoroscopic guidance. Contrast injected.

FINDINGS:
JOINT CAPSULE:
- Capacity: [normal/increased/decreased]
- Distension: [adequate]

CONTRAST DISTRIBUTION:
- Hip joint: [filled]
- Iliopsoas bursa: [may communicate - filled/not filled]

LABRAL TEAR:
- Contrast tracking under labrum: [present/absent]
- Location: [anterior/superior/posterior]

LOOSE BODIES:
- Filling defects: [present/absent]

ARTICULAR CARTILAGE:
- Preserved: [yes/no]
- Defects: [describe if seen]

SYNOVIAL ABNORMALITIES:
- Irregularity: [present/absent]
- Synovitis: [suggested]

LEGG-CALVÉ-PERTHES (PEDIATRIC):
- Joint space: [widened]
- Containment: [assessed]

POST-INJECTION THERAPY: [performed/not performed]

IMPRESSION: [Hip joint findings]. [Labral status]. [Recommend MR arthrography for detailed labral evaluation].`,
    "arthrography,hip,joint,labrum",
    "Fluoroscopic hip arthrography"
  ),
  ...withLaterality(
    "Arthrography - Knee",
    "Knee",
    `KNEE ARTHROGRAPHY ([LATERALITY]) - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: [Lateral] knee joint accessed under fluoroscopic guidance. Contrast injected.

FINDINGS:
JOINT CAPSULE:
- Suprapatellar pouch: [filled, normal/reduced size]
- Gastrocnemius-semimembranosus bursa: [may fill]

MENISCAL TEARS:
- Medial meniscus: [contrast tracking into tear - present/absent]
- Lateral meniscus: [contrast tracking into tear - present/absent]
- Location: [anterior horn/body/posterior horn]

CRUCIATE LIGAMENTS:
- ACL: [outline normal/irregular]
- PCL: [outline normal/irregular]

ARTICULAR CARTILAGE:
- Femoral condyles: [smooth/irregular]
- Tibial plateaus: [smooth/irregular]
- Patella: [smooth/irregular]

LOOSE BODIES:
- Filling defects: [present/absent]

POPLITEAL CYST (BAKER'S):
- Communicating: [yes/no]
- Size: [cm]

IMPRESSION: [Knee joint findings]. [Meniscal status]. [Note: MRI preferred for knee evaluation].`,
    "arthrography,knee,joint,meniscus",
    "Fluoroscopic knee arthrography"
  ),
  ...withLaterality(
    "Arthrography - Wrist",
    "Wrist/Hand",
    `WRIST ARTHROGRAPHY ([LATERALITY]) - REPORT

CLINICAL INDICATION: [Indication - wrist pain, TFCC tear]

TECHNIQUE: [Lateral] wrist joint accessed under fluoroscopic guidance. Contrast injected.

FINDINGS:
RADIOCARPAL JOINT:
- Filled: [yes]
- Contrast tracking: [describe]

INTERCARPAL COMMUNICATION:
- Midcarpal joint: [filled/normal NOT to fill]
- If filled: [indicates intercarpal ligament tear - SLIL/LLIL]

DISTAL RADIOULNAR JOINT:
- Filled: [yes/no - via TFCC tear]
- TFCC tear: [present/absent]

TRIANGULAR FIBROCARTILAGE COMPLEX (TFCC):
- Tear: [contrast into DRUJ - present/absent]
- Location: [central/ulnar/radial]

SCAPHOLUNATE LIGAMENT:
- Tear: [contrast into midcarpal at scapholunate interval]

LUNOTRIQUETRAL LIGAMENT:
- Tear: [contrast into midcarpal at lunotriquetral interval]

GANGLION CYST: [filled/seen]

IMPRESSION: [Wrist joint findings]. [TFCC/intercarpal ligament status]. [Communication patterns].`,
    "arthrography,wrist,joint,tfcc",
    "Fluoroscopic wrist arthrography"
  ),
  ...withLaterality(
    "Joint Injection - Diagnostic",
    "Multiple",
    `JOINT INJECTION ([LATERALITY]) - DIAGNOSTIC - REPORT

CLINICAL INDICATION: [Indication - pain, diagnostic block]

TECHNIQUE: [Lateral] [joint name] accessed under fluoroscopic guidance. Contrast confirmed intra-articular position. Anesthetic injected.

FINDINGS:
NEEDLE POSITION:
- Placement: [intra-articular]
- Contrast spread: [characteristic arthrogram]

CONTRAST DISTRIBUTION:
- [Describe joint filling]

JOINT ABNORMALITIES (IF SEEN):
- Degenerative changes: [present/absent]
- Loose bodies: [present/absent]
- Synovial irregularity: [present/absent]

POST-INJECTION:
- Pain relief: [immediate/none/partial - patient report]
- Percentage relief: [if assessed]

COMPLICATIONS: [none]

IMPRESSION: [Successful intra-articular injection]. [Diagnostic value]. [Pain response].`,
    "joint injection,diagnostic,block",
    "Fluoroscopic joint injection for diagnosis"
  ),
  ...withLaterality(
    "Joint Injection - Therapeutic",
    "Multiple",
    `JOINT INJECTION ([LATERALITY]) - THERAPEUTIC - REPORT

CLINICAL INDICATION: [Indication - arthritis, joint pain]

TECHNIQUE: [Lateral] [joint name] accessed under fluoroscopic guidance. Contrast confirmed position. Corticosteroid/anesthetic injected.

FINDINGS:
NEEDLE POSITION:
- Placement: [intra-articular - confirmed with contrast]

CONTRAST DISTRIBUTION:
- [Joint name]: [filled appropriately]

JOINT APPEARANCE:
- Joint space: [maintained/narrowed]
- Osteophytes: [present/absent]
- Loose bodies: [present/absent]

MEDICATION INJECTED:
- [Drug name, dose]
- Volume: [ml]

POST-PROCEDURE:
- Immediate pain relief: [yes/no]

PATIENT INSTRUCTIONS:
- [Rest, activity modification, pain diary]

COMPLICATIONS: [none/immediate]

FOLLOW-UP: [as clinically indicated]

IMPRESSION: [Successful therapeutic joint injection]. [Medication details].`,
    "joint injection,therapeutic,corticosteroid",
    "Fluoroscopic therapeutic joint injection"
  ),

  // ==================== INTERVENTIONAL ====================
  {
    title: "GI Intervention - Feeding Tube Placement",
    category: "Fluoroscopy Interventional",
    bodyPart: "Stomach",
    description: "Fluoroscopic-guided feeding tube placement",
    modality: "Fluoroscopy",
    tags: "feeding tube,ng tube,peg,enteral",
    content: `FLUOROSCOPIC FEEDING TUBE PLACEMENT - REPORT

CLINICAL INDICATION: [Indication - enteral nutrition needed]

PROCEDURE: [Nasogastric/Nasojejunal/PEG tube placement]

FINDINGS:
TUBE PLACEMENT:
- Type: [NG/NJ/PEG]
- Size: [French]

ROUTE:
- Nasal: [right/left]
- Esophageal course: [normal]
- Stomach: [tube tip in body/antrum]

NJ TUBE:
- Tip position: [jejunum - location]
- Past ligament of Treitz: [yes/no]

CONFIRMATION:
- Contrast injection: [confirms intraluminal position]
- No aspiration: [confirmation]

COMPLICATIONS:
- Aspiration: [none]
- Misplacement: [none]
- Perforation: [none]

SECUREMENT: [tube secured at nose/abdominal wall]

POST-PROCEDURE:
- Tube functioning: [confirmed]
- Feeding initiation: [per protocol]

IMPRESSION: [Feeding tube placed successfully]. [Tip location]. [Ready for feeding].`
  },
  {
    title: "GI Intervention - Stricture Dilatation",
    category: "Fluoroscopy Interventional",
    bodyPart: "Esophagus",
    description: "Fluoroscopic-guided stricture dilatation",
    modality: "Fluoroscopy",
    tags: "dilatation,stricture,esophageal,balloon",
    content: `FLUOROSCOPIC STRICTURE DILATATION - REPORT

CLINICAL INDICATION: [Indication - dysphagia, stricture]

PROCEDURE: Balloon dilatation under fluoroscopic guidance.

FINDINGS:
PRE-DILATATION:
- Stricture location: [esophageal/anastomotic/other]
- Stricture length: [cm]
- Stricture diameter: [mm]

DILATATION:
- Balloon size: [mm diameter]
- Duration: [seconds]
- Number of dilatations: [count]
- Balloon waist: [disappeared/improved]

POST-DILATATION:
- Diameter achieved: [mm]
- Contrast passage: [improved]
- Mucosal tear: [none/minimal - expected]

COMPLICATIONS:
- Perforation: [none/suspected - clinical correlation]
- Bleeding: [none/minimal]
- Pain: [controlled/uncontrolled]

FOLLOW-UP:
- Diet advancement: [per protocol]
- Repeat dilatation: [may be needed]

IMPRESSION: [Stricture dilated from X to Y mm]. [Successful procedure]. [Complications if any].`
  },
  {
    title: "GI Intervention - Stent Placement",
    category: "Fluoroscopy Interventional",
    bodyPart: "Esophagus",
    description: "Fluoroscopic-guided GI stent placement",
    modality: "Fluoroscopy",
    tags: "stent,esophageal,malignant,obstruction",
    content: `FLUOROSCOPIC GI STENT PLACEMENT - REPORT

CLINICAL INDICATION: [Indication - malignant obstruction]

PROCEDURE: [Esophageal/duodenal/colonic] stent placement under fluoroscopic guidance.

FINDINGS:
PRE-STENT:
- Stricture location: [describe]
- Stricture length: [cm]
- Stricture diameter: [mm]

STENT:
- Type: [covered/uncovered, self-expanding metal]
- Dimensions: [diameter x length]
- Position: [across stricture]
- Expansion: [complete/partial]

POST-STENT:
- Contrast flow: [through stent - good/impaired]
- Position: [satisfactory]
- Overlap: [appropriate - 2cm beyond each end]

COMPLICATIONS:
- Perforation: [none]
- Migration: [none immediate]
- Bleeding: [none/minimal]

FOLLOW-UP:
- Diet: [clear liquids advancing]
- Check X-ray: [as needed]

IMPRESSION: [Stent placed successfully]. [Position adequate]. [Lumen restored].`
  },
  {
    title: "Biliary Intervention - PTBD",
    category: "Fluoroscopy Interventional",
    bodyPart: "Liver",
    description: "Percutaneous transhepatic biliary drainage",
    modality: "Fluoroscopy",
    tags: "ptbd,biliary,drainage,pad",
    content: `PERCUTANEOUS TRANSHEPATIC BILIARY DRAINAGE - REPORT

CLINICAL INDICATION: [Indication - biliary obstruction]

PROCEDURE: Percutaneous puncture of intrahepatic duct, tract dilatation, catheter placement.

FINDINGS:
CHOLANGIOGRAM:
- Puncture: [right/left lobe duct]
- Ductal diameter: [mm]
- Obstruction level: [describe]
- Obstruction cause: [malignant/benign]

DRAINAGE CATHETER:
- Size: [French]
- Position: [across obstruction/external only]
- Side holes: [positioned appropriately]

BILIARY TREE:
- Proximal dilatation: [described]
- Stones: [present/absent]
- Debris: [present/absent]

DRAINAGE:
- Internal: [into duodenum]
- External: [catheter bag]

COMPLICATIONS:
- Hemorrhage: [none/minimal]
- Bile leak: [none]
- Sepsis: [monitor for]

POST-PROCEDURE:
- Drain output: [ml/day]
- Color: [bilious/bloody/clear]

IMPRESSION: [PTBD placed successfully]. [Drainage achieved]. [Catheter position adequate].`
  },
  {
    title: "Biliary Intervention - Stenting",
    category: "Fluoroscopy Interventional",
    bodyPart: "Liver",
    description: "Percutaneous biliary stent placement",
    modality: "Fluoroscopy",
    tags: "biliary,stent,ptbd,malignant",
    content: `PERCUTANEOUS BILIARY STENTING - REPORT

CLINICAL INDICATION: [Indication]

PROCEDURE: Percutaneous access, stricture crossed, stent deployed.

FINDINGS:
PRE-STENT:
- Stricture location: [distal CBD/mid/proximal/hilar]
- Stricture length: [cm]
- Ductal diameter above: [mm]

STENT:
- Type: [covered/uncovered metal/plastic]
- Dimensions: [diameter x length]
- Position: [across stricture]
- Expansion: [complete/partial]

POST-STENT CHOLANGIOGRAM:
- Flow: [through stent into duodenum]
- Residual gradient: [if measured]

CATHETER:
- External drain: [left in place/removed]
- If left: [for safety/access]

COMPLICATIONS:
- Hemobilia: [none/minimal]
- Bile leak: [none]
- Sepsis: [monitor]

IMPRESSION: [Biliary stent placed successfully]. [Biliary drainage restored].`
  },
  {
    title: "GU Intervention - Nephrostomy",
    category: "Fluoroscopy Interventional",
    bodyPart: "Kidneys",
    description: "Percutaneous nephrostomy placement",
    modality: "Fluoroscopy",
    tags: "nephrostomy,pcn,drainage,kidney",
    content: `PERCUTANEOUS NEPHROSTOMY - REPORT

CLINICAL INDICATION: [Indication - hydronephrosis, obstruction]

PROCEDURE: Percutaneous access into renal collecting system, tract dilatation, catheter placement.

FINDINGS:
ACCESS:
- Side: [right/left]
- Calyx punctured: [lower/mid/upper pole]
- Approach: [subcostal/supracostal]

NEPHROSTOGRAM:
- Collecting system: [dilated - grade]
- Calculi: [present/absent]
- Filling defects: [blood clot/tumor]
- Obstruction: [level described]

CATHETER:
- Size: [French]
- Type: [pigtail/straight]
- Position: [in renal pelvis/calyx]
- Side holes: [appropriately positioned]

URINE:
- Output: [immediate ml]
- Appearance: [clear/bloody/purulent]

COMPLICATIONS:
- Hemorrhage: [none/minimal - monitor]
- Infection: [monitor]
- Adjacent organ injury: [none]

POST-PROCEDURE:
- Irrigation: [if needed]
- Urine output monitoring

IMPRESSION: [Nephrostomy placed successfully]. [Drainage achieved]. [Catheter position adequate].`
  },
  {
    title: "GU Intervention - DJ Stenting",
    category: "Fluoroscopy Interventional",
    bodyPart: "Ureters",
    description: "Double-J ureteral stent placement",
    modality: "Fluoroscopy",
    tags: "dj stent,ureteral stent,ureter,obstruction",
    content: `DOUBLE-J URETERAL STENT PLACEMENT - REPORT

CLINICAL INDICATION: [Indication]

PROCEDURE: [Retrograde/Antegrade] ureteral stent placement under fluoroscopic guidance.

FINDINGS:
URETER:
- Side: [right/left]
- Obstruction: [level, cause]
- Dilatation: [present/absent]

STENT:
- Type: [Double-J]
- Size: [French x length cm]
- Position:
  - Upper curl: [in renal pelvis]
  - Lower curl: [in bladder]
- Side holes: [appropriate]

POST-STENT:
- Contrast drainage: [observed]
- Ureter peristalsis: [present]

METHOD:
- Retrograde: [cystoscopy guided]
- Antegrade: [percutaneous access]

COMPLICATIONS:
- Ureteral injury: [none]
- Malposition: [none]
- Infection: [prophylaxis given]

FOLLOW-UP:
- Stent change: [every 3-6 months]
- Stone management: [if applicable]

IMPRESSION: [DJ stent placed successfully]. [Position adequate]. [Drainage established].`
  },
  {
    title: "Vascular Intervention - Angiography Guidance",
    category: "Fluoroscopy Interventional",
    bodyPart: "Vascular",
    description: "Fluoroscopic guidance for angiography",
    modality: "Fluoroscopy",
    tags: "angiography,guidance,vascular,catheter",
    content: `FLUOROSCOPIC ANGIOGRAPHY GUIDANCE - REPORT

CLINICAL INDICATION: [Indication]

PROCEDURE: Vascular access and catheter guidance under fluoroscopy.

FINDINGS:
ACCESS:
- Site: [femoral/radial/brachial]
- Side: [right/left]
- Needle: [gauge]
- Sheath: [French]

CATHETER COURSE:
- Type: [describe catheter]
- Position: [vessel location]

FLUOROSCOPIC TIME: [minutes]

CONTRAST USED: [ml]

VASCULATURE EVALUATED:
- [Describe vessels imaged]

COMPLICATIONS:
- Access site: [hematoma/dissection/none]
- Contrast reaction: [none/present]
- Distal embolization: [none]

POST-PROCEDURE:
- Hemostasis: [manual closure/device]
- Pulse check: [distal pulses present]

IMPRESSION: [Procedure summary]. [Access site]. [No immediate complications].`
  },

  // ==================== PEDIATRIC ====================
  {
    title: "Pediatric Barium Swallow",
    category: "Fluoroscopy Pediatric",
    bodyPart: "Esophagus",
    description: "Barium swallow for pediatric patients",
    modality: "Fluoroscopy",
    tags: "pediatric,barium swallow,child,infant",
    content: `PEDIATRIC BARIUM SWALLOW - REPORT

CLINICAL INDICATION: [Indication - feeding difficulty, dysphagia]

TECHNIQUE: Age-appropriate barium preparation used. Fluoroscopy with low-dose technique.

FINDINGS:
ORAL PHASE:
- Suck/swallow: [coordinated/uncoordinated]
- Bottle feeding: [if infant - assessed]

ESOPHAGUS:
- Cervical: [normal/abnormal]
- Thoracic: [normal/abnormal]
- GE junction: [normal/abnormal]

SWALLOWING:
- Coordination: [normal/impaired]
- Aspiration: [present/absent]
- Penetration: [present/absent]

ANATOMICAL ABNORMALITIES:
- TEF: [suggested/not seen]
- Vascular ring: [impression on esophagus]
- Stricture: [present/absent]

GERD:
- Reflux: [present/absent - grade]

TRANSIT: [normal/delayed]

RADIATION DOSE: Minimized with pulsed fluoroscopy

IMPRESSION: [Findings]. [Aspiration risk]. [Recommendations].`
  },
  {
    title: "Pediatric MCU",
    category: "Fluoroscopy Pediatric",
    bodyPart: "Bladder",
    description: "Pediatric micturating cystourethrogram",
    modality: "Fluoroscopy",
    tags: "pediatric,mcu,vur,child",
    content: `PEDIATRIC MCU - REPORT

CLINICAL INDICATION: [Indication - UTI, VUR screening]

TECHNIQUE: Catheterization, low-dose fluoroscopy, voiding imaging.

FINDINGS:
BLADDER:
- Capacity: [ml - age appropriate?]
- Contour: [smooth/trabeculated]

URETHRA:
- Normal for age: [yes/no]
- Posterior urethral valves: [present/absent - males]

VESICOURETERAL REFLUX:
- Right: [Grade 0-V]
- Left: [Grade 0-V]
- Intrarenal reflux: [present/absent]

CONGENITAL ANOMALIES:
- Ureterocele: [present/absent]
- Duplex kidney changes: [present/absent]
- Bladder diverticulum: [present/absent]

VOIDING:
- Complete: [yes/no]
- Residual: [ml]

RADIATION MINIMIZATION:
- Pulsed fluoroscopy
- Last image hold
- Limited frames

IMPRESSION: [VUR grade]. [Urethral findings]. [Follow-up plan].`
  },
  {
    title: "Pediatric Upper GI - Malrotation",
    category: "Fluoroscopy Pediatric",
    bodyPart: "Stomach",
    description: "Upper GI for malrotation evaluation",
    modality: "Fluoroscopy",
    tags: "pediatric,malrotation,upper gi,volvulus",
    content: `PEDIATRIC UPPER GI - MALROTATION EVALUATION

CLINICAL INDICATION: [Indication - bilious vomiting, malrotation screen]

FINDINGS:
DUODENAL COURSE:
- Normal: [C-loop crossing midline, 4th portion to left of spine, at duodenojejunal flexure]
- D-J flexure position: [normal - left of spine, at L1-L2 level]
- Abnormal: [D-J flexure right of midline/below expected level]

LIGAMENT OF TREITZ:
- Position: [normal/abnormally positioned]

CECUM POSITION (if contrast reaches):
- Right lower quadrant: [normal]
- Upper abdomen/midline: [suggests malrotation]

SIGNS OF MALROTATION:
- D-J flexure to right of spine: [present/absent]
- D-J flexure low: [present/absent]
- Corkscrew appearance: [midgut volvulus - emergency]
- Z-shape duodenum: [present/absent]

MIDGUT VOLVULUS:
- Signs: [present/absent - surgical emergency]

AGE-RELATED FINDINGS:
- In infants, D-J flexure position may vary slightly

IMPRESSION: [Malrotation present/absent/indeterminate]. [Volvulus risk]. [Recommend surgery consult if positive].`
  },
  {
    title: "Pediatric Contrast Enema - Hirschsprung",
    category: "Fluoroscopy Pediatric",
    bodyPart: "Colon",
    description: "Contrast enema for Hirschsprung's evaluation",
    modality: "Fluoroscopy",
    tags: "pediatric,hirschsprung,contrast enema,colon",
    content: `PEDIATRIC CONTRAST ENEMA - HIRSCHSPRUNG EVALUATION

CLINICAL INDICATION: [Indication - constipation, distension, Hirschsprung's suspected]

FINDINGS:
COLON CALIBER:
- Rectum: [normal/dilated]
- Sigmoid: [normal/dilated]
- Transition zone: [present/absent]
  - Location: [rectosigmoid/sigmoid/descending/splenic flexure/transverse]

CLASSIC HIRSCHSPRUNG SIGNS:
- Rectosigmoid ratio: [reversed - rectum smaller than sigmoid in Hirschsprung]
- Transition zone: [present/absent - cone-shaped]
- Aganglionic segment: [narrowed]
- Dilated proximal colon: [present]

CONTRAST RETENTION:
- Delayed evacuation: [suggestive of Hirschsprung]

AGE CONSIDERATIONS:
- Neonates: May not show classic transition zone
- Older infants: More reliable findings

ASSOCIATED FINDINGS:
- Enterocolitis: [suggested by mucosal irregularity]

CONFIRMATION:
- Rectal biopsy: [required for diagnosis]

IMPRESSION: [Findings suggestive/not suggestive of Hirschsprung's]. [Transition zone location if present]. [Recommend rectal biopsy for confirmation].`
  },
  {
    title: "Pediatric TEF Assessment",
    category: "Fluoroscopy Pediatric",
    bodyPart: "Esophagus",
    description: "Evaluation for tracheoesophageal fistula",
    modality: "Fluoroscopy",
    tags: "pediatric,tef,fistula,esophagus",
    content: `PEDIATRIC TEF ASSESSMENT - REPORT

CLINICAL INDICATION: [Indication - suspected TEF, recurrent pneumonia]

TECHNIQUE: Careful contrast study with water-soluble contrast. Tube in esophagus if needed.

FINDINGS:
ESOPHAGUS:
- Atresia: [present/absent]
- Pouch: [proximal esophageal pouch described]

FISTULA:
- Present: [yes/no]
- Type:
  - Proximal fistula: [present/absent]
  - Distal fistula: [present/absent - gas in stomach suggests]
  - H-type fistula: [present/absent - isolated TEF without atresia]

COMMUNICATION:
- To trachea: [present/absent - level]
- Size of fistula: [mm]

STOMACH:
- Gas present: [suggests distal fistula]
- No gas: [suggests isolated esophageal atresia]

TRACHEA:
- Compression: [present/absent]

ASPIRATION: [present/absent]

CLASSIFICATION (GROSS):
- Type A: [Isolated esophageal atresia - no fistula]
- Type B: [EA with proximal fistula]
- Type C: [EA with distal fistula - most common]
- Type D: [EA with both fistulas]
- Type E: [H-type fistula only]

IMPRESSION: [TEF type]. [Fistula characteristics]. [Surgical planning considerations].`
  },

  // ==================== DYNAMIC/FUNCTIONAL ====================
  {
    title: "Dynamic Swallowing Study (VFSS)",
    category: "Fluoroscopy Dynamic",
    bodyPart: "Esophagus",
    description: "Complete dynamic swallowing assessment",
    modality: "Fluoroscopy",
    tags: "vfss,dynamic,swallowing,functional",
    content: `DYNAMIC SWALLOWING STUDY (VFSS) - COMPREHENSIVE

CLINICAL INDICATION: [Indication]

TECHNIQUE: Video fluoroscopy with various consistencies.

FINDINGS:
ORAL PHASE (Dynamic):
- Bolus control: [normal/impaired]
- Mastication: [normal/impaired]
- Oral transit time: [normal/prolonged]

PHARYNGEAL PHASE (Dynamic):
- Pharyngeal trigger: [timely/delayed]
- Laryngeal elevation: [normal/reduced]
- Epiglottic closure: [complete/incomplete]
- CP opening: [normal/reduced]
- Residue: [none/valleculae/pyriforms]

ESOPHAGEAL PHASE:
- Primary peristalsis: [normal/weak/absent]
- Clearance: [complete/incomplete]

AIRWAY PROTECTION:
- Penetration: [describe]
- Aspiration: [describe - silent/overt]

CONSISTENCY TRIALS:
- [Results for each consistency]

COMPENSATORY STRATEGIES TESTED:
- [Chin tuck, head turn, etc. - effectiveness]

RECOMMENDATIONS:
- Diet: [safe consistencies]
- Strategies: [effective compensations]
- Therapy: [recommendations]

IMPRESSION: [Swallowing function]. [Aspiration risk]. [Dietary recommendations].`
  },
  {
    title: "Esophageal Motility Study",
    category: "Fluoroscopy Dynamic",
    bodyPart: "Esophagus",
    description: "Dynamic esophageal motility assessment",
    modality: "Fluoroscopy",
    tags: "motility,esophagus,dynamic,peristalsis",
    content: `ESOPHAGEAL MOTILITY STUDY - REPORT

CLINICAL INDICATION: [Indication - dysphagia]

TECHNIQUE: Video fluoroscopy of esophageal peristalsis with multiple swallows.

FINDINGS:
PERISTALTIC ACTIVITY:
- Primary peristalsis: [intact/weak/absent]
- Secondary peristalsis: [present/absent]
- Tertiary contractions: [present/absent]

WAVE PROPAGATION:
- Amplitude: [normal/reduced]
- Velocity: [normal/fast/slow]
- Progression: [organized/disorganized]

SPECIFIC PATTERNS:
- Achalasia: [bird's beak, aperistalsis, dilated esophagus]
- Diffuse esophageal spasm: [corkscrew appearance]
- Nutcracker esophagus: [high amplitude contractions]
- Scleroderma: [smooth muscle aperistalsis, distal dilation]

LOWER ESOPHAGEAL SPHINCTER:
- Resting tone: [assessed]
- Relaxation: [complete/partial/absent]
- Opening: [normal/restricted]

CLEARANCE:
- Single swallow: [% cleared]
- Multiple swallows: [assessment]

PRONE VS UPRIGHT:
- [Comparison if performed]

IMPRESSION: [Motility pattern]. [Suggested diagnosis]. [Correlate with manometry].`
  },
  {
    title: "Gastric Emptying Study (Fluoroscopic Assist)",
    category: "Fluoroscopy Dynamic",
    bodyPart: "Stomach",
    description: "Fluoroscopy-assisted gastric emptying assessment",
    modality: "Fluoroscopy",
    tags: "gastric emptying,stomach,functional",
    content: `FLUOROSCOPIC GASTRIC EMPTYING ASSESSMENT

CLINICAL INDICATION: [Indication - gastroparesis suspected]

TECHNIQUE: Barium meal with timed imaging.

FINDINGS:
BARIUM MEAL:
- Composition: [standard meal]
- Volume: [ml]

TIMED OBSERVATIONS:
- 0 minutes: [barium in stomach]
- 30 minutes: [% remaining]
- 60 minutes: [% remaining]
- 120 minutes: [% remaining]
- 4 hours: [% remaining]

GASTRIC EMPTYING:
- Half-time (T½): [minutes]
- Normal T½: approximately 60-90 minutes

MOTILITY:
- Antral contractions: [normal/reduced/absent]
- Propulsion: [normal/impaired]

DELAYED EMPTYING:
- Cause: [functional/mechanical]
- Outlet obstruction: [present/absent]

COMPARISON:
- [With prior study if available]

NOTE: Nuclear medicine gastric emptying study is gold standard.

IMPRESSION: [Gastric emptying assessment]. [Normal/delayed]. [Suggest nuclear medicine study for quantification].`
  },
  {
    title: "Pelvic Floor Study",
    category: "Fluoroscopy Dynamic",
    bodyPart: "Pelvis",
    description: "Dynamic pelvic floor fluoroscopy",
    modality: "Fluoroscopy",
    tags: "pelvic floor,dynamic,functional,prolapse",
    content: `DYNAMIC PELVIC FLOOR STUDY - REPORT

CLINICAL INDICATION: [Indication - prolapse, constipation]

TECHNIQUE: Rectal and vaginal (if applicable) contrast. Dynamic fluoroscopy.

FINDINGS:
AT REST:
- Bladder base position: [normal/descended]
- Uterus/cervix: [position]
- Anorectal junction: [position relative to PCL]

STRAINING:
- Bladder descent: [cm - cystocele]
- Uterine descent: [cm]
- Rectal descent: [cm - rectocele]
- Anorectal junction descent: [cm]
- Enterocele: [present/absent]

PELVIC FLOOR DESCENT:
- Normal: <2cm below PCL
- Excessive: >2cm below PCL

ORGAN PROLAPSE:
- Cystocele: [grade I/II/III]
- Rectocele: [size, emptying]
- Enterocele: [small bowel in pouch of Douglas]
- Uterine prolapse: [degree]

ANORECTAL:
- Intussusception: [present/absent - grade]
- Anismus: [present/absent]

MULTICOMPARTMENT ASSESSMENT:
- Anterior: [bladder]
- Middle: [uterus/vault]
- Posterior: [rectum]

IMPRESSION: [Pelvic floor dysfunction]. [Multi-compartment prolapse]. [Surgical planning considerations].`
  },

  // ==================== TRAUMA ====================
  {
    title: "Fluoroscopy - Esophageal Leak Study",
    category: "Fluoroscopy Trauma",
    bodyPart: "Esophagus",
    description: "Water-soluble contrast study for esophageal leak",
    modality: "Fluoroscopy",
    tags: "esophagus,leak,trauma,perforation",
    content: `ESOPHAGEAL LEAK STUDY - REPORT

CLINICAL INDICATION: [Indication - suspected esophageal perforation]

TECHNIQUE: Water-soluble contrast swallow. Barium used if initial study negative.

FINDINGS:
ESOPHAGUS:
- Mucosal integrity: [intact/abnormal]
- Wall: [smooth/irregular]

EXTRAVASATION:
- Present: [yes/no]
- Location: [cervical/thoracic/abdominal esophagus]
- Size of leak: [mm]
- Track: [describe direction]

COLLECTION:
- Abscess cavity: [present/absent - size]
- Communication: [with pleural space/mediastinum]

LEVEL OF LEAK:
- Distance from incisors: [cm]

PLEURAL SPACE:
- Contrast entry: [present/absent]

MEDIASTINUM:
- Contrast tracking: [present/absent]

DELAYED IMAGES:
- Leak persistence: [yes/no]

IMPRESSION: [Esophageal leak present/absent]. [Location and size]. [Extension to adjacent spaces]. [Clinical urgency].`
  },
  {
    title: "Fluoroscopy - Bowel Perforation Study",
    category: "Fluoroscopy Trauma",
    bodyPart: "Abdomen",
    description: "Water-soluble contrast study for bowel perforation",
    modality: "Fluoroscopy",
    tags: "bowel,perforation,leak,trauma",
    content: `WATER-SOLUBLE CONTRAST STUDY - BOWEL PERFORATION

CLINICAL INDICATION: [Indication - suspected bowel perforation]

TECHNIQUE: Water-soluble contrast administered [orally/via NG tube/rectally].

FINDINGS:
BOWEL:
- Segment evaluated: [describe]
- Luminal integrity: [intact/abnormal]

EXTRAVASATION:
- Present: [yes/no]
- Location: [describe]
- Size of leak: [mm]
- Pattern: [contained/free]

EXTRALUMINAL CONTRAST:
- Track: [describe]
- Collection: [present/absent - size]
- Abscess cavity: [present/absent]

SITE OF PERFORATION:
- [Describe anatomical location]

EXTENT:
- Localized: [yes/no]
- Diffuse: [yes/no]

DELAYED IMAGES:
- Progression: [describe]

CLINICAL CORRELATION:
- Peritoneal signs: [clinical assessment]

IMPRESSION: [Bowel perforation present/absent]. [Location]. [Contained vs free]. [Urgency].`
  },
  {
    title: "Fluoroscopy - Urethral Trauma (RGU)",
    category: "Fluoroscopy Trauma",
    bodyPart: "Urethra",
    description: "RGU for urethral trauma",
    modality: "Fluoroscopy",
    tags: "rgu,urethra,trauma,injury",
    content: `RGU - URETHRAL TRAUMA - REPORT

CLINICAL INDICATION: [Indication - pelvic trauma, blood at meatus]

TECHNIQUE: Retrograde urethrogram performed cautiously.

FINDINGS:
URETHRA:
- Anterior urethra: [intact/injured]
- Posterior urethra: [intact/injured]

EXTRAVASATION:
- Present: [yes/no]
- Location: [above/below urogenital diaphragm/both]
- Amount: [small/moderate/large]

INJURY CLASSIFICATION:
- Partial: [contrast reaches bladder]
- Complete: [no contrast reaches bladder]

CLASSIFICATION (COLAPOINT/SISCHAR):
- Type I: [Stretched, intact]
- Type II: [Membranous/prostatic - above UG diaphragm]
- Type III: [Most common - above and below UG diaphragm]
- Type IV: [Bladder neck injury]
- Type V: [Anterior urethral injury]

PELVIC FRACTURES:
- Associated: [yes/no - review CT]

BLADDER FILLING:
- Via urethra: [partial injuries only]

IMPRESSION: [Urethral injury type]. [Partial vs complete]. [Management recommendations - suprapubic cystostomy vs primary realignment].`
  },
  {
    title: "Fluoroscopy - Bladder Injury (Cystogram)",
    category: "Fluoroscopy Trauma",
    bodyPart: "Bladder",
    description: "Cystogram for bladder injury",
    modality: "Fluoroscopy",
    tags: "cystogram,bladder,trauma,rupture",
    content: `CYSTOGRAM - BLADDER INJURY - REPORT

CLINICAL INDICATION: [Indication - trauma, hematuria, suspected bladder rupture]

TECHNIQUE: Bladder filled via catheter with water-soluble contrast. Minimum 300ml for adequate distension.

FINDINGS:
BLADDER:
- Shape: [normal/compressed by hematoma/abnormal]
- Filling: [complete/incomplete]

EXTRAVASATION:
- Present: [yes/no]
- Pattern:
  - Intraperitoneal: [contrast outlines bowel loops, flows to paracolic gutters]
  - Extraperitoneal: [contrast in perivesical space, flame-shaped/molar tooth]
  - Combined: [both patterns]

SITE:
- Dome: [typical intraperitoneal]
- Base: [typical extraperitoneal - associated with pelvic fracture]

DEGREE:
- [Small/moderate/large extravasation]

PELVIC FRACTURES:
- [Describe if known from CT]

POST-DRAINAGE FILM:
- Residual extravasation: [present/absent]
- Important for detecting posterior injuries

URETHRAL INJURY:
- Concomitant: [suspected/not suspected]

IMPRESSION: [Bladder rupture type - intraperitoneal/extraperitoneal/combined]. [Severity]. [Surgical management indication].`
  },

  // ==================== SPECIAL PROTOCOLS ====================
  {
    title: "Water-Soluble Contrast Study",
    category: "Fluoroscopy Special",
    bodyPart: "Multiple",
    description: "General water-soluble contrast study protocol",
    modality: "Fluoroscopy",
    tags: "water soluble,contrast,leak,perforation",
    content: `WATER-SOLUBLE CONTRAST STUDY - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Water-soluble contrast (ionic or non-ionic) used instead of barium.

REASON FOR WATER-SOLUBLE:
- [Suspected perforation/post-operative/leak assessment/aspiration risk]

FINDINGS:
ANATOMY EVALUATED:
- [Describe]

CONTRAST FLOW:
- [Normal course/describe abnormality]

EXTRAVASATION:
- Present: [yes/no]
- Location: [describe]
- Amount: [small/moderate/large]

FILLING DEFECTS:
- [Present/absent - describe]

OBSTRUCTION:
- [Present/absent - level]

LEAK:
- [Present/absent - location, size]

DELAYED IMAGES:
- [Findings]

LIMITATIONS:
- Water-soluble less radiodense than barium
- May miss small leaks
- Dilution in fluid

IF NEGATIVE:
- May proceed with barium for better detail

IMPRESSION: [Findings]. [Leak present/absent]. [Clinical recommendations].`
  },
  {
    title: "Double Contrast Technique Study",
    category: "Fluoroscopy Special",
    bodyPart: "Multiple",
    description: "Double contrast technique documentation",
    modality: "Fluoroscopy",
    tags: "double contrast,technique,mucosal",
    content: `DOUBLE CONTRAST STUDY - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Double contrast technique using barium suspension and gas-forming agent.

FINDINGS:
COATING:
- Quality: [excellent/good/fair/poor]
- Uniform: [yes/no]

GAS DISTENSION:
- Adequate: [yes/no]

MUCOSAL DETAIL:
- Visualization: [excellent/good/fair]

LESIONS IDENTIFIED:
- [Describe]

ADVANTAGES OF DOUBLE CONTRAST:
- Superior mucosal detail
- Better detection of small lesions
- Surface patterns visible

LIMITATIONS:
- Requires patient cooperation
- May miss extramucosal pathology
- Not suitable for obstruction

COMPARISON:
- With single contrast findings

IMPRESSION: [Findings with double contrast technique]. [Mucosal abnormalities].`
  },
  {
    title: "Timed Imaging Protocol",
    category: "Fluoroscopy Special",
    bodyPart: "Multiple",
    description: "Timed imaging study protocol",
    modality: "Fluoroscopy",
    tags: "timed,protocol,transit,serial",
    content: `TIMED IMAGING STUDY - REPORT

CLINICAL INDICATION: [Indication]

TECHNIQUE: Serial imaging at predetermined intervals.

FINDINGS:
TIMING PROTOCOL:
- Time 0: [Initial administration]
- Time [X]: [findings]
- Time [X]: [findings]
- Time [X]: [findings]
- Time [X]: [final film]

TRANSIT ASSESSMENT:
- Contrast progression: [describe]
- Delay points: [describe]

QUANTITATIVE ASSESSMENT:
- Transit time: [total time]
- Delay at specific points: [describe]

COMPARISON TO NORMAL:
- [Normal ranges for study type]

ABNORMALITIES:
- Delayed transit: [location]
- Rapid transit: [location]

IMPRESSION: [Transit assessment]. [Delayed segments]. [Clinical significance].`
  },
  {
    title: "Post-Operative Leak Study",
    category: "Fluoroscopy Special",
    bodyPart: "Multiple",
    description: "Post-operative anastomotic leak evaluation",
    modality: "Fluoroscopy",
    tags: "postoperative,leak,anastomosis,surgery",
    content: `POST-OPERATIVE LEAK STUDY - REPORT

CLINICAL INDICATION: [Indication]
SURGERY: [Type and date]

TECHNIQUE: Water-soluble contrast study. Barium considered if initial negative.

FINDINGS:
ANASTOMOSIS:
- Location: [describe]
- Appearance: [intact/abnormal]

LEAK:
- Present: [yes/no]
- Size: [mm]
- Location: [relative to anastomosis]
- Track: [describe]

COLLECTION:
- Abscess: [present/absent - size]
- Contained: [yes/no]

CONTRAST FLOW:
- Distal passage: [present/absent]
- Proximal pooling: [present/absent]

Surgical Anatomy:
- [Describe relevant anatomy]

DELAYED IMAGES:
- [Findings]

CLINICAL STATUS:
- [Relevant clinical information]

IMPRESSION: [Anastomotic integrity]. [Leak present/absent]. [Size and location if present]. [Clinical recommendations].`
  },
  {
    title: "Tube/Line Position Check",
    category: "Fluoroscopy Special",
    bodyPart: "Multiple",
    description: "Fluoroscopic verification of tube/line position",
    modality: "Fluoroscopy",
    tags: "tube,line,position,verification",
    content: `FLUOROSCOPIC TUBE/LINE POSITION CHECK - REPORT

CLINICAL INDICATION: [Indication - confirm tube position]

DEVICE: [Type - NG tube/feeding tube/drain/catheter]

TECHNIQUE: Fluoroscopic imaging with/without contrast injection.

FINDINGS:
TUBE/LINE:
- Type: [describe]
- Size: [French/gauge]
- Course: [described]

TIP POSITION:
- Location: [anatomical location]
- Appropriate: [yes/no]

CONTRAST INJECTION (if performed):
- Flow: [described]
- Confirms: [intraluminal/extraluminal]

ASSESSMENT:
- Position: [satisfactory/needs adjustment]
- Function: [draining/infusing adequately]

COMPLICATIONS:
- Malposition: [describe]
- Kinking: [present/absent]
- Obstruction: [present/absent]

ADJUSTMENTS MADE:
- [Describe if any]

RECOMMENDATIONS:
- [Clinical recommendations]

IMPRESSION: [Tube/line position]. [Satisfactory/adjustment needed]. [Confirmation of placement].`
  }
];

async function main() {
  console.log('Starting Fluoroscopy templates seeding...');

  // Get or create Fluoroscopy category
  let category = await prisma.category.findFirst({
    where: { name: 'Fluoroscopy' }
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Fluoroscopy',
        description: 'Fluoroscopy guided procedures and studies',
        icon: 'activity',
        color: 'text-purple-500'
      }
    });
    console.log('Created Fluoroscopy category');
  }

  // Process templates
  let addedCount = 0;
  let skippedCount = 0;

  for (const templateData of fluoroscopyTemplates) {
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
        modality: 'Fluoroscopy',
        tags: templateData.tags
      }
    });

    addedCount++;
  }

  console.log(`Fluoroscopy templates seeding complete!`);
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
