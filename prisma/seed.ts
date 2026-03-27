import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Comprehensive radiology seed data
const categories = [
  { name: 'CT', description: 'Computed Tomography scans', icon: 'scan', color: 'blue' },
  { name: 'MRI', description: 'Magnetic Resonance Imaging', icon: 'magnet', color: 'purple' },
  { name: 'X-Ray', description: 'Radiography examinations', icon: 'sun', color: 'amber' },
  { name: 'Ultrasound', description: 'Sonography examinations', icon: 'waves', color: 'teal' },
  { name: 'Mammography', description: 'Breast imaging', icon: 'heart', color: 'pink' },
  { name: 'Nuclear Medicine', description: 'PET and SPECT imaging', icon: 'activity', color: 'green' },
  { name: 'Fluoroscopy', description: 'Real-time X-ray imaging', icon: 'video', color: 'orange' },
  { name: 'Interventional', description: 'Image-guided procedures', icon: 'needle', color: 'red' },
]

const bodyParts = [
  { name: 'Head/Brain', description: 'Neurological imaging' },
  { name: 'Chest/Thorax', description: 'Chest and thoracic cavity' },
  { name: 'Abdomen', description: 'Abdominal organs' },
  { name: 'Pelvis', description: 'Pelvic structures' },
  { name: 'Spine', description: 'Vertebral column' },
  { name: 'Upper Extremity', description: 'Arms, shoulders, hands' },
  { name: 'Lower Extremity', description: 'Legs, hips, feet' },
  { name: 'Neck', description: 'Cervical region' },
  { name: 'Cardiac', description: 'Heart and vessels' },
  { name: 'Breast', description: 'Breast tissue' },
  { name: 'Whole Body', description: 'Full body imaging' },
]

const templates = [
  // CT Templates
  {
    title: 'CT Head Without Contrast',
    description: 'Standard non-contrast CT of the brain for trauma, stroke, or headache evaluation',
    content: `CT HEAD WITHOUT CONTRAST

INDICATION: [Indication]

TECHNIQUE: Axial images were obtained through the brain from the skull base to the vertex without intravenous contrast.

COMPARISON: [Previous imaging if available]

FINDINGS:
Brain parenchyma: No acute intracranial hemorrhage, mass, or mass effect. No evidence of acute infarction. Gray-white differentiation is preserved.

Ventricles and extra-axial spaces: Ventricles and sulci are normal in size and configuration. No hydrocephalus. No extra-axial collection.

Calvarium: No acute fracture. No suspicious lytic or blastic lesions.

Paranasal sinuses and mastoid air cells: Clear. No air-fluid levels.

Soft tissues: Unremarkable.

IMPRESSION:
1. No acute intracranial abnormality.
2. [Additional findings if any]`,
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'brain,head,trauma,stroke,headache,non-contrast',
  },
  {
    title: 'CT Head With and Without Contrast',
    description: 'CT brain with contrast enhancement for mass evaluation',
    content: `CT HEAD WITH AND WITHOUT CONTRAST

INDICATION: [Indication]

TECHNIQUE: Non-contrast axial images were obtained through the brain followed by contrast-enhanced axial images after administration of [amount] mL of intravenous iodinated contrast.

COMPARISON: [Previous imaging if available]

NON-CONTRAST FINDINGS:
Brain parenchyma: [Findings]

CONTRAST-ENHANCED FINDINGS:
Enhancement pattern: [Describe any enhancing lesions]
Vascular structures: [Findings]

Detailed evaluation:
- Parenchymal abnormalities: [Describe]
- Mass effect/midline shift: [Describe]
- Ventricular system: [Describe]
- Extra-axial spaces: [Describe]
- Calvarium: [Describe]
- Skull base: [Describe]
- Orbits: [Describe]
- Paranasal sinuses: [Describe]

IMPRESSION:
1. [Primary finding]
2. [Secondary findings]
3. [Recommendations]`,
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'brain,head,contrast,mass,tumor,enhancement',
  },
  {
    title: 'CT Chest With Contrast',
    description: 'Contrast-enhanced CT of the chest for pulmonary and mediastinal evaluation',
    content: `CT CHEST WITH CONTRAST

INDICATION: [Indication]

TECHNIQUE: Helical CT images were obtained through the chest following administration of [amount] mL of intravenous iodinated contrast. Images were reviewed in axial, coronal, and sagittal planes.

COMPARISON: [Previous imaging if available]

FINDINGS:

LUNGS:
- Lung parenchyma: [Describe nodules, masses, infiltrates, emphysema, etc.]
- Airways: Patent bronchi to the subsegmental level. [Abnormalities]

PLEURA:
- No pleural effusion. No pneumothorax. [Additional findings]

MEDIASTINUM AND HILUM:
- Heart: Normal size. No pericardial effusion.
- Great vessels: Unremarkable.
- Lymph nodes: No enlarged mediastinal or hilar lymph nodes.
- Esophagus: Unremarkable.

CHEST WALL AND DIAPHRAGM:
- Unremarkable. [Abnormalities]

UPPER ABDOMEN:
- Liver: [Describe]
- Spleen: [Describe]
- Adrenal glands: [Describe]
- Other: [Describe]

BONES:
- No suspicious osseous lesions. [Fractures, metastases]

IMPRESSION:
1. [Primary finding]
2. [Secondary findings]
3. [Follow-up recommendations if applicable]`,
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'chest,lungs,pulmonary,mediastinum,contrast,cancer staging',
  },
  {
    title: 'CT Abdomen and Pelvis With Contrast',
    description: 'Comprehensive CT of abdomen and pelvis with IV contrast',
    content: `CT ABDOMEN AND PELVIS WITH CONTRAST

INDICATION: [Indication]

TECHNIQUE: Helical CT images were obtained through the abdomen and pelvis following administration of [amount] mL of intravenous iodinated contrast. [Oral contrast if used]. Multiplanar reformations were reviewed.

COMPARISON: [Previous imaging if available]

FINDINGS:

LIVER:
- Size: Normal. [Hepatomegaly if present]
- Parenchyma: Homogeneous enhancement. [Lesions, cirrhosis, steatosis]
- Portal vein: Patent. [Thrombosis, varices]
- Biliary tree: Normal caliber. [Dilation, stones]

GALLBLADDER AND BILIARY:
- Gallbladder: Unremarkable. [Stones, wall thickening, pericholecystic fluid]
- Common bile duct: Normal caliber.

PANCREAS:
- Size and morphology: Normal. [Atrophy, masses, pancreatitis]
- Pancreatic duct: Normal.

SPLEEN:
- Size: Normal. [Splenomegaly]
- Parenchyma: Homogeneous. [Lesions]

ADRENAL GLANDS:
- Unremarkable bilaterally. [Nodules, thickening]

KIDNEYS AND URETERS:
- Kidneys: Normal in size and enhancement bilaterally. [Nephrolithiasis, hydronephrosis, masses]
- Ureters: Unremarkable. [Calculi, dilation]

BLADDER:
- Unremarkable. [Wall thickening, masses, diverticula]

GASTROINTESTINAL TRACT:
- Stomach: Unremarkable.
- Small bowel: Unremarkable. No obstruction.
- Colon: Unremarkable. [Appendix, diverticulosis]
- Mesentery: Unremarkable.

LYMPH NODES:
- No pathologic lymphadenopathy.

VESSELS:
- Aorta and IVC: Unremarkable. [Aneurysm, thrombosis]

PERITONEUM AND RETROPERITONEUM:
- No free fluid. No free air.

PELVIC ORGANS:
- [Male/Female specific findings]

BONES:
- No suspicious osseous lesions.

IMPRESSION:
1. [Primary finding]
2. [Secondary findings]
3. [Recommendations]`,
    categoryName: 'CT',
    bodyPartName: 'Abdomen',
    modality: 'CT',
    tags: 'abdomen,pelvis,contrast,abdominal pain,oncology',
  },
  {
    title: 'CT Spine Cervical Without Contrast',
    description: 'CT of the cervical spine for trauma or degenerative disease',
    content: `CT CERVICAL SPINE WITHOUT CONTRAST

INDICATION: [Indication]

TECHNIQUE: Helical CT images were obtained through the cervical spine from the skull base to the thoracic inlet. Axial, sagittal, and coronal reformations were reviewed.

COMPARISON: [Previous imaging if available]

FINDINGS:

VERTEBRAL ALIGNMENT:
- Normal cervical lordosis maintained. [Loss of lordosis, kyphosis]
- No listhesis. [Anterolisthesis, retrolisthesis]

VERTEBRAL BODIES:
- C1 (Atlas): [Findings]
- C2 (Axis): [Findings]
- C3-C7: No acute fracture. [Compression fractures, degenerative changes]

FACET JOINTS:
- Facet alignment maintained. [Subluxation, dislocation]
- No facet arthropathy. [Degenerative changes]

INTERVERTEBRAL DISCS:
- Normal disc height maintained. [Disc space narrowing]
- No acute disc herniation identified on CT.

SPINAL CANAL:
- Adequate canal diameter. [Stenosis]
- No canal compromise.

NEURAL FORAMINA:
- Patent. [Foraminal narrowing]

PREVERTEBRAL SOFT TISSUES:
- No abnormal soft tissue swelling.

PARASPINAL SOFT TISSUES:
- Unremarkable.

IMPRESSION:
1. No acute cervical spine fracture or malalignment.
2. [Degenerative changes if present]
3. [Additional findings and recommendations]`,
    categoryName: 'CT',
    bodyPartName: 'Spine',
    modality: 'CT',
    tags: 'cervical,spine,neck,trauma,fracture,degenerative',
  },
  {
    title: 'CT Angiography Head and Neck',
    description: 'CTA for evaluation of cerebral and neck vasculature',
    content: `CT ANGIOGRAPHY HEAD AND NECK

INDICATION: [Indication - stroke, TIA, aneurysm screening, etc.]

TECHNIQUE: CT angiography was performed through the head and neck following bolus administration of [amount] mL of intravenous iodinated contrast. Images were reviewed in axial, MIP, and 3D reformats.

COMPARISON: [Previous imaging if available]

FINDINGS:

AORTIC ARCH AND GREAT VESSELS:
- Aortic arch: [Configuration, atherosclerosis]
- Brachiocephalic artery: Patent.
- Left common carotid artery: Patent.
- Left subclavian artery: Patent.

CAROTID ARTERIES:
- Right common carotid: Patent. [Stenosis, plaque]
- Right internal carotid: Patent. [Stenosis percentage]
- Right external carotid: Patent.
- Left common carotid: Patent.
- Left internal carotid: Patent.
- Left external carotid: Patent.

VERTEBRAL ARTERIES:
- Right vertebral: Patent. [Dominance, stenosis]
- Left vertebral: Patent.

INTRACRANIAL CIRCULATION:
- Circle of Willis: Complete. [Variant anatomy]
- Anterior cerebral arteries: Patent bilaterally.
- Middle cerebral arteries: Patent bilaterally. [M1, M2 segments]
- Posterior cerebral arteries: Patent bilaterally.
- Basilar artery: Patent.

ANEURYSM EVALUATION:
- No intracranial aneurysm identified. [If present: location, size, neck]

VASCULAR MALFORMATIONS:
- None identified.

INCIDENTAL BRAIN FINDINGS:
- [Non-contrast brain findings]

IMPRESSION:
1. [Primary vascular finding]
2. [Stenosis quantification if applicable]
3. [Recommendations for follow-up or additional imaging]`,
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'CTA,angiography,stroke,aneurysm,carotid,vascular',
  },
  {
    title: 'CT Pulmonary Angiography',
    description: 'CTPA for pulmonary embolism evaluation',
    content: `CT PULMONARY ANGIOGRAPHY

INDICATION: [Indication - suspected pulmonary embolism]

TECHNIQUE: CT pulmonary angiography was performed through the chest following bolus administration of [amount] mL of intravenous iodinated contrast. Images were reviewed in axial, MIP, and coronal reformats.

COMPARISON: [Previous imaging if available]

FINDINGS:

PULMONARY ARTERIES:
- Main pulmonary artery: [Size, filling defects]
- Right pulmonary artery: [Filling defects]
- Left pulmonary artery: [Filling defects]
- Lobar and segmental branches: Evaluated.

PULMONARY EMBOLISM:
- [None identified] OR
- [Location and extent of emboli]:
  - Main/lobar/segmental/subsegmental distribution
  - Central vs peripheral
  - Extent: [Percentage of vascular bed]

LUNGS:
- Pulmonary infarcts: [Present/Absent]
- Parenchymal abnormalities: [Describe]
- Pleural effusions: [Present/Absent]

RIGHT HEART:
- Right ventricle size: Normal/enlarged
- Right ventricular to left ventricular ratio: [Ratio]
- Interventricular septum: Normal/bowed

DEEP VEIN ASSESSMENT (if included):
- IVC: [Patent/Thrombus]
- Iliac veins: [Patent/Thrombus]
- Femoral veins: [Patent/Thrombus]

OTHER THORACIC FINDINGS:
- [Incidental findings]

IMPRESSION:
1. [Negative/Positive] for pulmonary embolism.
2. [If positive: extent and location]
3. [Right heart strain assessment]
4. [Additional findings and recommendations]`,
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'CTPA,pulmonary embolism,PE,chest,vascular,lung',
  },
  {
    title: 'CT Colonography',
    description: 'Virtual colonoscopy for colorectal cancer screening',
    content: `CT COLONOGRAPHY

INDICATION: [Indication - colorectal cancer screening]

TECHNIQUE: CT colonography was performed after colonic preparation and insufflation. Prone and supine images were obtained. 2D and 3D endoluminal fly-through was performed.

COMPARISON: [Previous colonoscopy or CTC if available]

COLONIC DISTENTION:
- Adequate overall distention. [Underdistended segments]

COLONIC PREPARATION:
- Adequate. [Residual fluid/stool]

FINDINGS BY COLONIC SEGMENT:

CECUM:
- [Findings]

ASCENDING COLON:
- [Findings]

HEPATIC FLEXURE:
- [Findings]

TRANSVERSE COLON:
- [Findings]

SPLENIC FLEXURE:
- [Findings]

DESCENDING COLON:
- [Findings]

SIGMOID COLON:
- [Findings]

RECTUM:
- [Findings]

POLYPS/LESIONS:
- None identified. OR
- [Location, size, morphology]:
  - Polyp 1: [Location], [size] mm, [sessile/pedunculated]
  - Polyp 2: [Details]

DIVERTICULOSIS:
- [Present/Absent], [Location], [Severity]

COLONIC WALL:
- No wall thickening. [If present: location, extent]

EXTRACOLONIC FINDINGS:
- [Significant extracolonic findings]

IMPRESSION:
1. [Negative/Positive] for colorectal polyps or masses.
2. [If positive: polyp details and colonoscopy recommendation]
3. [Diverticulosis if present]
4. [Extracolonic findings requiring follow-up]`,
    categoryName: 'CT',
    bodyPartName: 'Abdomen',
    modality: 'CT',
    tags: 'colonography,screening,colorectal,polyps,virtual colonoscopy',
  },

  // MRI Templates
  {
    title: 'MRI Brain Without Contrast',
    description: 'Standard brain MRI for neurological evaluation',
    content: `MRI BRAIN WITHOUT CONTRAST

INDICATION: [Indication]

TECHNIQUE: Multiplanar multisequence MRI of the brain was performed including:
- Sagittal T1-weighted
- Axial T1-weighted
- Axial T2-weighted
- Axial FLAIR
- Axial DWI/ADC
- Axial SWI/GRE

COMPARISON: [Previous imaging if available]

FINDINGS:

BRAIN PARENCHYMA:
- No acute infarction on DWI.
- No intracranial hemorrhage.
- No mass or mass effect.
- Normal gray-white differentiation.
- No focal signal abnormality. [If present: location, signal characteristics]

VENTRICLES AND CSF SPACES:
- Ventricles are normal in size.
- No hydrocephalus.
- No extra-axial collection.
- Normal CSF flow at foramen magnum.

MIDLINE STRUCTURES:
- Midline structures are central.
- No midline shift.

POSTERIOR FOSSA:
- Brainstem: Unremarkable.
- Cerebellum: Unremarkable.
- Fourth ventricle: Normal.

SELLA AND PARASELLAR REGION:
- Pituitary gland: Normal size and signal.
- No sellar or suprasellar mass.

VASCULAR:
- Major intracranial flow voids preserved.
- No vascular malformation.

MENINGES:
- No abnormal meningeal enhancement (if contrast given) or thickening.

CALVARIUM AND SKULL BASE:
- No suspicious bone marrow signal abnormality.
- Skull base foramina appear normal.

PARANASAL SINUSES AND MASTOIDS:
- Clear. No air-fluid levels.

VISUALIZED UPPER NECK:
- Unremarkable.

IMPRESSION:
1. No acute intracranial abnormality.
2. [Chronic/incidental findings if any]
3. [Recommendations]`,
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'brain,MRI,neurological,seizure,headache,dementia',
  },
  {
    title: 'MRI Brain With and Without Contrast',
    description: 'Contrast-enhanced brain MRI for tumor, infection, or inflammatory evaluation',
    content: `MRI BRAIN WITH AND WITHOUT CONTRAST

INDICATION: [Indication]

TECHNIQUE: Multiplanar multisequence MRI of the brain was performed before and after administration of [dose] mL of gadolinium-based contrast. Sequences include:
- Sagittal T1
- Axial T1, T2, FLAIR
- Axial DWI/ADC
- Axial SWI
- Post-contrast: Axial, coronal, and sagittal T1 with fat saturation

COMPARISON: [Previous imaging if available]

NON-CONTRAST FINDINGS:

BRAIN PARENCHYMA:
- DWI: No restricted diffusion to suggest acute infarction.
- T2/FLAIR: [Describe signal abnormalities]
- T1: [Describe]
- SWI: No hemorrhage. [If present: location]

MASS LESIONS:
- [If present: location, size, signal characteristics, surrounding edema, mass effect]

POST-CONTRAST FINDINGS:

ENHANCEMENT PATTERN:
- No abnormal enhancement. OR
- Enhancing lesion(s):
  - Location: [Describe]
  - Size: [Measurements]
  - Enhancement pattern: [Homogeneous, ring, nodular]
  - Surrounding T2/FLAIR signal: [Edema]

MENINGEAL ENHANCEMENT:
- None. [If present: pachymeningeal vs leptomeningeal]

SPECIFIC STRUCTURES EVALUATED:
- Pituitary: [Enhancement pattern, size]
- Cranial nerves: [Enhancement]
- Internal auditory canals: [Findings]

PERFUSION/SPECTROSCOPY (if performed):
- [Findings]

IMPRESSION:
1. [Primary diagnosis/impression]
2. [Lesion characterization if present]
3. [Differential diagnosis considerations]
4. [Recommendations for follow-up or additional imaging]`,
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'brain,contrast,tumor,infection,demyelination,MS,metastases',
  },
  {
    title: 'MRI Lumbar Spine Without Contrast',
    description: 'MRI of the lumbar spine for radiculopathy or back pain evaluation',
    content: `MRI LUMBAR SPINE WITHOUT CONTRAST

INDICATION: [Indication - low back pain, radiculopathy]

TECHNIQUE: Multiplanar multisequence MRI of the lumbar spine was performed including:
- Sagittal T1-weighted
- Sagittal T2-weighted
- Axial T1-weighted
- Axial T2-weighted

COMPARISON: [Previous imaging if available]

FINDINGS:

VERTEBRAL ALIGNMENT:
- Normal lumbar lordosis. [Loss of lordosis, kyphosis]
- No spondylolisthesis. [If present: grade, level]

VERTEBRAL BODIES:
- Normal vertebral body height and alignment.
- Normal marrow signal. [If abnormal: Modic changes, compression fractures]
- No suspicious marrow replacing lesion.

INTERVERTEBRAL DISCS:
- L1-L2: [Disc height, hydration, herniation]
- L2-L3: [Findings]
- L3-L4: [Findings]
- L4-L5: [Findings]
- L5-S1: [Findings]

DISC HERNIATION CLASSIFICATION (if present):
- Type: [Protrusion, extrusion, sequestration]
- Direction: [Central, paracentral, foraminal, far lateral]
- Size: [Measurements]
- Effect on thecal sac and nerve roots: [Describe]

SPINAL CANAL:
- Canal diameter: Adequate. [Stenosis: mild/moderate/severe]
- Conus medullaris: Normal position and signal.
- Cauda equina: Unremarkable.

NEURAL FORAMINA:
- [Level by level assessment]:
  - L3-L4: Patent bilaterally.
  - L4-L5: Patent bilaterally. [If narrowed: side, severity]
  - L5-S1: Patent bilaterally.

FACET JOINTS:
- No significant facet arthropathy. [If present: level, severity]

LIGAMENTUM FLAVUM:
- No significant hypertrophy. [If present: level]

PARASPINAL SOFT TISSUES:
- Unremarkable.

IMPRESSION:
1. [Primary finding - disc herniation, stenosis, etc.]
2. [Secondary findings]
3. [Correlation with clinical symptoms]
4. [Recommendations]`,
    categoryName: 'MRI',
    bodyPartName: 'Spine',
    modality: 'MRI',
    tags: 'lumbar,spine,back pain,radiculopathy,disc herniation,stenosis',
  },
  {
    title: 'MRI Knee Without Contrast',
    description: 'MRI of the knee for internal derangement evaluation',
    content: `MRI KNEE WITHOUT CONTRAST

INDICATION: [Indication - pain, instability, trauma]

TECHNIQUE: Multiplanar multisequence MRI of the [right/left] knee was performed including:
- Sagittal T1, T2, PD fat-sat
- Coronal T1, PD fat-sat
- Axial T2 fat-sat

COMPARISON: [Previous imaging if available]

FINDINGS:

MENISCI:
- Medial meniscus:
  - Body: Intact. [Tear: type, location]
  - Posterior horn: Intact.
  - Anterior horn: Intact.
- Lateral meniscus:
  - Body: Intact.
  - Posterior horn: Intact.
  - Anterior horn: Intact.

ANTERIOR CRUCIATE LIGAMENT (ACL):
- Intact. [Partial tear, complete tear, mucoid degeneration]
- Signal: Normal. [Increased signal]
- Orientation: Normal. [Vertical orientation if torn]

POSTERIOR CRUCIATE LIGAMENT (PCL):
- Intact. [Tear if present]

MEDIAL COLLATERAL LIGAMENT (MCL):
- Intact. [Sprain grade I/II/III if present]

LATERAL COLLATERAL LIGAMENT (LCL):
- Intact. [Tear if present]

EXTENSOR MECHANISM:
- Quadriceps tendon: Intact.
- Patellar tendon: Intact. [Tendinosis, tear]
- Patella: Normal position and signal.

CARTILAGE:
- Medial compartment: Intact cartilage. [Chondral defect: grade, location]
- Lateral compartment: Intact cartilage.
- Patellofemoral compartment: Intact cartilage.
- Trochlea: Intact cartilage.

BONE MARROW:
- No bone marrow edema. [If present: location, size]
- No occult fracture.
- Osteochondral lesions: None. [If present: describe]

JOINT SPACE:
- No significant joint effusion. [If present: size]
- No popliteal cyst. [If present: size]

SOFT TISSUES:
- Unremarkable. [Popliteal cyst, Baker's cyst, other]

IMPRESSION:
1. [Primary finding - ligament tear, meniscal tear, etc.]
2. [Secondary findings]
3. [Recommendations for management]`,
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'knee,MRI,ACL,meniscus,sports medicine,orthopedic',
  },
  {
    title: 'MRI Shoulder Without Contrast',
    description: 'MRI of the shoulder for rotator cuff and labral evaluation',
    content: `MRI SHOULDER WITHOUT CONTRAST

INDICATION: [Indication - pain, weakness, instability]

TECHNIQUE: Multiplanar multisequence MRI of the [right/left] shoulder was performed including:
- Sagittal T1, T2 fat-sat
- Coronal T1, T2 fat-sat
- Axial T2 fat-sat, PD fat-sat

COMPARISON: [Previous imaging if available]

FINDINGS:

ROTATOR CUFF:
- Supraspinatus tendon: Intact. [Tendinosis, partial tear (articular/bursal surface, depth), full-thickness tear (size)]
- Infraspinatus tendon: Intact.
- Subscapularis tendon: Intact.
- Teres minor tendon: Intact.
- Muscle belly signal and volume: Normal. [Fatty infiltration if present]

BICEPS TENDON:
- Long head: Normal position and signal. [Tendinosis, tear, subluxation]
- Anchor: Intact.

LABRUM:
- Superior labrum: Intact. [SLAP lesion: type]
- Anterior labrum: Intact. [Bankart lesion, fraying]
- Posterior labrum: Intact. [Reverse Bankart]

GLENOHUMERAL LIGAMENTS:
- IGLO: Intact. [Tear if present]

CARTILAGE:
- Humeral head: Intact. [Chondral defect]
- Glenoid: Intact. [Chondral defect]

BONE MARROW:
- Humeral head: Normal marrow signal. [Edema, Hill-Sachs lesion]
- Glenoid: Normal. [Bony Bankart]
- Acromion: [Type I/II/III morphology]
- Acromioclavicular joint: [Degenerative changes, osteolysis]

SUBACROMIAL SPACE:
- Adequate. [Narrowing]
- No subacromial bursitis. [If present: extent]

AXILLARY RECESS AND JOINT SPACE:
- No effusion. [If present: size]

SOFT TISSUES:
- Unremarkable.

IMPRESSION:
1. [Primary finding - rotator cuff tear, labral tear, etc.]
2. [Secondary findings]
3. [Recommendations for management]`,
    categoryName: 'MRI',
    bodyPartName: 'Upper Extremity',
    modality: 'MRI',
    tags: 'shoulder,MRI,rotator cuff,labrum,SLAP,sports medicine',
  },

  // X-Ray Templates
  {
    title: 'Chest X-Ray PA and Lateral',
    description: 'Standard chest radiograph interpretation',
    content: `CHEST X-RAY PA AND LATERAL

INDICATION: [Indication]

TECHNIQUE: PA and lateral views of the chest were obtained.

COMPARISON: [Previous imaging if available]

FINDINGS:

LUNGS:
- Lung volumes: Normal. [Hyperinflation, reduced volumes]
- Lung parenchyma: Clear. No focal consolidation, mass, or nodule.
- Pulmonary vasculature: Normal. [Pulmonary vascular congestion]

CARDIAC:
- Heart size: Normal. Cardiomediastinal silhouette within normal limits.
- Cardiac contour: Normal.
- Cardiothoracic ratio: [Ratio]

MEDIASTINUM:
- Mediastinal contours: Normal. [Widening, mass]
- Hila: Normal in size and position. [Lymphadenopathy]

PLEURA:
- No pleural effusion.
- No pneumothorax.

BONES:
- Ribs: No acute fracture. [Fractures, metastases]
- Spine: Visible vertebral bodies unremarkable.
- Clavicles: Unremarkable.

SOFT TISSUES:
- Unremarkable.

TUBES/LINES (if present):
- [Position and location]

IMPRESSION:
1. No acute cardiopulmonary abnormality.
2. [Abnormal findings if present]
3. [Recommendations]`,
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'chest,X-Ray,PA,lateral,cough,dyspnea,screening',
  },
  {
    title: 'Abdominal X-Ray (KUB)',
    description: 'Kidney, ureter, and bladder radiograph',
    content: `ABDOMINAL X-RAY (KUB)

INDICATION: [Indication - abdominal pain, bowel obstruction, nephrolithiasis]

TECHNIQUE: Supine view of the abdomen was obtained. [Additional views if performed: upright, decubitus]

COMPARISON: [Previous imaging if available]

FINDINGS:

BOWEL GAS PATTERN:
- Stomach: Normal gas pattern.
- Small bowel: Non-dilated. [Dilation, air-fluid levels]
- Large bowel: Normal distribution of gas. [Dilation, cutoff sign]
- No evidence of bowel obstruction. [If present: location, severity]

PNEUMOPERITONEUM:
- No free intraperitoneal air. [If present: amount, location]

CALCIFICATIONS:
- No obvious radiopaque calculi. [If present: location, size]
- No abnormal soft tissue calcifications.

ORGAN SILHOUETTES:
- Liver: Normal size. [Hepatomegaly]
- Spleen: Not enlarged.
- Kidneys: Bilateral renal outlines visible. [Size, position]
- Psoas shadows: Visible bilaterally.

BONES:
- Lumbar spine: Unremarkable. [Degenerative changes]
- Pelvis: Unremarkable. [Fractures, lesions]
- Sacroiliac joints: Unremarkable.

SOFT TISSUES:
- Unremarkable.

IMPRESSION:
1. No evidence of bowel obstruction or pneumoperitoneum.
2. [Calcifications if present]
3. [Other findings]
4. [Recommendations for additional imaging]`,
    categoryName: 'X-Ray',
    bodyPartName: 'Abdomen',
    modality: 'X-Ray',
    tags: 'abdomen,KUB,X-Ray,obstruction,stones,abdominal pain',
  },
  {
    title: 'Cervical Spine X-Ray',
    description: 'Cervical spine radiographic evaluation',
    content: `CERVICAL SPINE X-RAY

INDICATION: [Indication - neck pain, trauma, radiculopathy]

TECHNIQUE: [Views obtained: AP, lateral, odontoid, oblique, flexion/extension]

COMPARISON: [Previous imaging if available]

FINDINGS:

ALIGNMENT:
- Normal cervical lordosis. [Loss of lordosis, kyphosis]
- Vertebral alignment: Normal. [Anterolisthesis, retrolisthesis - level, grade]

VERTEBRAL BODIES:
- Height: Maintained. [Compression fracture - level, percentage]
- Vertebral body margins: Intact. [Anterior wedge fracture]

DISC SPACES:
- Preserved disc heights. [Narrowing - level]

FACET JOINTS:
- Facet alignment normal. [Subluxation, dislocation]

PREVERTEBRAL SOFT TISSUE:
- Normal width.
  - C1-C3: < 7 mm
  - C4-C7: < 22 mm
- [Widening if present]

NEURAL FORAMINA (oblique views):
- Patent. [Narrowing - level, side]

ODONTOID PROCESS:
- Intact. [Fracture type if present]
- ADI (atlantodental interval): Normal, < 3 mm.

SPINOUS PROCESSES:
- Intact. [Avulsion fracture]

SOFT TISSUES:
- Unremarkable.

IMPRESSION:
1. No acute fracture or malalignment.
2. [Degenerative changes if present]
3. [Abnormal findings]
4. [Recommendations for CT/MRI if needed]`,
    categoryName: 'X-Ray',
    bodyPartName: 'Spine',
    modality: 'X-Ray',
    tags: 'cervical,spine,neck,X-Ray,trauma,radiculopathy',
  },
  {
    title: 'Extremity X-Ray (General Template)',
    description: 'Template for extremity radiographs (arm, leg, hand, foot)',
    content: `[BODY PART] X-RAY

INDICATION: [Indication - pain, swelling, trauma]

TECHNIQUE: [Views obtained: AP, lateral, oblique]

COMPARISON: [Previous imaging if available]

FINDINGS:

BONES:
- No acute fracture. [If fracture present:
  - Bone: [Name]
  - Location: [Head, neck, shaft, base, etc.]
  - Type: [Transverse, oblique, spiral, comminuted]
  - Displacement: [Describe]
  - Angulation: [Describe]
  - Joint involvement: [Yes/No]]
- No dislocation. [If present: describe]
- Bone mineralization: Normal. [Osteopenia]
- No lytic or blastic lesions. [If present: location, size]

JOINTS:
- Joint spaces: Preserved. [Narrowing]
- Alignment: Normal. [Subluxation, dislocation]
- No erosions. [If present: location]
- Soft tissue swelling around joints: None.

SOFT TISSUES:
- No abnormal soft tissue swelling. [If present: location, extent]
- No foreign body. [If present: location, size]
- No subcutaneous emphysema.

IMPRESSION:
1. No acute fracture or dislocation.
2. [Fracture description if present]
3. [Soft tissue findings]
4. [Follow-up recommendations]`,
    categoryName: 'X-Ray',
    bodyPartName: 'Upper Extremity',
    modality: 'X-Ray',
    tags: 'extremity,fracture,X-Ray,trauma,orthopedic',
  },

  // Ultrasound Templates
  {
    title: 'Abdominal Ultrasound Complete',
    description: 'Comprehensive abdominal sonography',
    content: `ABDOMINAL ULTRASOUND COMPLETE

INDICATION: [Indication]

TECHNIQUE: Grayscale and color Doppler ultrasound examination of the abdomen was performed.

COMPARISON: [Previous imaging if available]

FINDINGS:

LIVER:
- Size: Normal. [Hepatomegaly - span in cm]
- Echotexture: Normal. [Coarse, heterogeneous]
- Focal lesions: None. [If present: size, location, echogenicity]
- Vasculature: Portal vein patent with hepatopetal flow. [Thrombosis, reversal of flow]
- Hepatic veins: Patent. [Thrombosis]

GALLBLADDER AND BILIARY:
- Gallbladder: Normal size and wall thickness. [Stones, sludge, polyps, wall thickening]
- Common bile duct: [Diameter in mm]. Normal. [Dilation]
- Intrahepatic ducts: Not dilated.

PANCREAS:
- Visualized portions: Normal echotexture. [Atrophy, focal masses]
- Pancreatic duct: Not dilated.

SPLEEN:
- Size: Normal. [Splenomegaly - length in cm]
- Echotexture: Homogeneous.

KIDNEYS:
- Right kidney: [Size in cm]. Normal cortical thickness and echogenicity. No hydronephrosis. [Nephrolithiasis, cysts, masses]
- Left kidney: [Size in cm]. Normal cortical thickness and echogenicity. No hydronephrosis.

ADRENAL GLANDS:
- Not well visualized. [If visualized: normal]

AORTA:
- [Diameter in cm] at the level of the renal arteries. No aneurysm. [If AAA: size, extent]

INFERIOR VENA CAVA:
- Normal caliber. [Thrombosis]

PLEURAL SPACES:
- No pleural effusion identified. [If present: side, amount]

ASCITES:
- None identified. [If present: amount]

IMPRESSION:
1. [Primary finding]
2. [Secondary findings]
3. [Recommendations for follow-up or additional imaging]`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'Ultrasound',
    tags: 'abdomen,ultrasound,complete,liver,gallbladder,kidney',
  },
  {
    title: 'Renal Ultrasound',
    description: 'Ultrasound of the kidneys and bladder',
    content: `RENAL ULTRASOUND

INDICATION: [Indication - flank pain, hematuria, renal insufficiency]

TECHNIQUE: Grayscale and color Doppler ultrasound examination of the kidneys and bladder was performed.

COMPARISON: [Previous imaging if available]

FINDINGS:

RIGHT KIDNEY:
- Size: [Length] x [Width] cm. Normal.
- Cortical thickness: Normal. [Thinned]
- Cortical echogenicity: Normal. [Increased]
- Corticomedullary differentiation: Preserved.
- Hydronephrosis: None. [Grade 1-4]
- Calculi: None. [If present: size, location]
- Cysts/Masses: None. [If present: size, location, characteristics]
- Perinephric space: Unremarkable.

LEFT KIDNEY:
- Size: [Length] x [Width] cm. Normal.
- Cortical thickness: Normal.
- Cortical echogenicity: Normal.
- Corticomedullary differentiation: Preserved.
- Hydronephrosis: None.
- Calculi: None.
- Cysts/Masses: None.
- Perinephric space: Unremarkable.

URETERS:
- Not visualized. [If dilated: describe]

BLADDER:
- Wall: Normal thickness. [Thickened]
- Lumen: No focal abnormality. [Stones, masses]
- Post-void residual: [Volume in mL] mL.

RENAL VASCULATURE (if Doppler performed):
- Main renal arteries: Normal flow bilaterally. [Stenosis]
- Renal veins: Patent. [Thrombosis]
- Resistive indices: Right [value], Left [value].

IMPRESSION:
1. [Primary finding - hydronephrosis, nephrolithiasis, etc.]
2. [Secondary findings]
3. [Renal function assessment]
4. [Recommendations]`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'Ultrasound',
    tags: 'renal,kidney,ultrasound,hydronephrosis,stones',
  },
  {
    title: 'Thyroid Ultrasound',
    description: 'Ultrasound examination of the thyroid gland',
    content: `THYROID ULTRASOUND

INDICATION: [Indication - palpable nodule, abnormal thyroid function tests]

TECHNIQUE: Grayscale and color Doppler ultrasound examination of the thyroid gland was performed.

COMPARISON: [Previous imaging if available]

FINDINGS:

THYROID GLAND:
- Size: Right lobe [dimensions], Left lobe [dimensions], Isthmus [thickness]
- Total thyroid volume: [Volume in mL]
- Echotexture: Homogeneous. [Heterogeneous, coarse]
- Vascularity: Normal. [Increased in thyroiditis]

RIGHT LOBE:
- Parenchyma: Normal. [Nodules, cysts]
- Nodules (if present):
  - Nodule 1: [Size], [Location], [Echogenicity], [Composition], [Margins], [Echogenic foci]
  - TI-RADS category: [Category]
- No calcifications. [Microcalcifications, macrocalcifications]

LEFT LOBE:
- Parenchyma: Normal.
- Nodules (if present): [Details as above]

ISTHMUS:
- Normal thickness. [Thickened]

ADJACENT STRUCTURES:
- Lymph nodes:
  - Central compartment: No suspicious lymph nodes.
  - Lateral neck (levels II-V): No suspicious lymph nodes.
  - If present: [Size, characteristics, suspicious features]
- Trachea: Midline.
- Carotid arteries: Normal.
- Jugular veins: Normal.

IMPRESSION:
1. Thyroid parenchyma: [Normal/Abnormal]
2. Nodules: [List with TI-RADS categories]
3. [Biopsy recommendations based on TI-RADS]
4. [Follow-up recommendations]`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Neck',
    modality: 'Ultrasound',
    tags: 'thyroid,ultrasound,nodule,TI-RADS,neck',
  },
  {
    title: 'OB Ultrasound First Trimester',
    description: 'First trimester obstetric ultrasound',
    content: `OBSTETRIC ULTRASOUND - FIRST TRIMESTER

INDICATION: [Indication - dating, bleeding, pain]

TECHNIQUE: Transabdominal and/or transvaginal ultrasound examination was performed.

COMPARISON: [Previous imaging if available]

FINDINGS:

UTERUS:
- Size: [Dimensions]
- Contour: Normal. [Fibroids, anomalies]
- Myometrium: Homogeneous. [Fibroids - size, location]

ADNEXA:
- Right ovary: [Size, follicles, masses]
- Left ovary: [Size, follicles, masses]
- Corpus luteum: [Present/Not seen], location: [Side]
- Adnexal masses: None. [If present: size, characteristics]

GESTATIONAL SAC:
- Present: Yes. [Location: intrauterine/ectopic]
- Mean sac diameter: [mm]
- Shape: Normal. [Irregular]

YOLK SAC:
- Present: Yes/No.
- Size: [mm]
- Appearance: Normal. [Calcified, irregular]

EMBRYO:
- Present: Yes/No.
- Crown-rump length (CRL): [mm]
- Cardiac activity: Present. [Heart rate: bpm] OR Absent.

ESTIMATED GESTATIONAL AGE:
- By CRL: [Weeks + days]
- EDD by ultrasound: [Date]

AMNIOTIC FLUID:
- Normal. [Decreased, increased]

CERVIX:
- Length: [mm]
- Internal os: Closed. [Open]

OTHER PELVIC FINDINGS:
- Free fluid: None. [Present: amount, location]

IMPRESSION:
1. Intrauterine pregnancy. [Single/Multiple]
2. Cardiac activity: Present/Absent.
3. Estimated gestational age: [Weeks + days]
4. EDD: [Date]
5. [Other findings]
6. [Follow-up recommendations]`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Pelvis',
    modality: 'Ultrasound',
    tags: 'OB,obstetric,first trimester,pregnancy,dating',
  },
  {
    title: 'Carotid Ultrasound Doppler',
    description: 'Carotid artery duplex examination',
    content: `CAROTID ULTRASOUND DUPLEX

INDICATION: [Indication - TIA, stroke, bruit, pre-surgical evaluation]

TECHNIQUE: Bilateral carotid and vertebral artery duplex ultrasound was performed with grayscale, color Doppler, and spectral Doppler analysis.

COMPARISON: [Previous imaging if available]

FINDINGS:

RIGHT SIDE:
Common Carotid Artery:
- PSV: [cm/s]
- EDV: [cm/s]
- Plaque: None/Mild/Moderate

Carotid Bulb/Bifurcation:
- PSV: [cm/s]
- EDV: [cm/s]
- ICA/CCA ratio: [Ratio]
- Plaque: [None/Describe - echogenicity, ulceration]
- Stenosis: [Percentage based on criteria]

Internal Carotid Artery:
- PSV: [cm/s]
- EDV: [cm/s]
- Plaque: [Describe]
- Stenosis: [Percentage]

External Carotid Artery:
- Flow: Normal. [Abnormal]

Vertebral Artery:
- Flow: Antegrade. [Retrograde, absent]
- PSV: [cm/s]

LEFT SIDE:
Common Carotid Artery:
- PSV: [cm/s]
- EDV: [cm/s]
- Plaque: None/Mild/Moderate

Carotid Bulb/Bifurcation:
- PSV: [cm/s]
- EDV: [cm/s]
- ICA/CCA ratio: [Ratio]
- Plaque: [None/Describe]
- Stenosis: [Percentage]

Internal Carotid Artery:
- PSV: [cm/s]
- EDV: [cm/s]
- Plaque: [Describe]
- Stenosis: [Percentage]

External Carotid Artery:
- Flow: Normal.

Vertebral Artery:
- Flow: Antegrade. [Retrograde, absent]
- PSV: [cm/s]

STENOSIS CLASSIFICATION:
- Right ICA: [Normal/<50%/50-69%/70-99%/Near occlusion/Occlusion]
- Left ICA: [Normal/<50%/50-69%/70-99%/Near occlusion/Occlusion]

IMPRESSION:
1. Right ICA: [Stenosis percentage]
2. Left ICA: [Stenosis percentage]
3. [Plaque characteristics]
4. [Vertebral artery findings]
5. [Recommendations]`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Neck',
    modality: 'Ultrasound',
    tags: 'carotid,doppler,stroke,TIA,vascular,stenosis',
  },

  // Mammography Templates
  {
    title: 'Screening Mammography',
    description: 'Screening mammogram interpretation using BI-RADS',
    content: `SCREENING MAMMOGRAPHY

INDICATION: Screening

TECHNIQUE: Bilateral digital mammography with 2D and/or tomosynthesis (3D) was performed in the standard CC and MLO projections.

COMPARISON: [Previous mammograms: dates and locations]

FINDINGS:

TISSUE DENSITY:
- Breast tissue composition: [Almost entirely fatty / Scattered fibroglandular densities / Heterogene dense / Extremely dense]

RIGHT BREAST:
- Masses: None identified. [If present: size, location, shape, margins]
- Calcifications: None. [If present: morphology, distribution]
- Architectural distortion: None.
- Asymmetries: None.
- Lymph nodes: Normal axillary lymph nodes.
- Skin and nipples: Normal.
- Other findings: None.

LEFT BREAST:
- Masses: None identified.
- Calcifications: None.
- Architectural distortion: None.
- Asymmetries: None.
- Lymph nodes: Normal axillary lymph nodes.
- Skin and nipples: Normal.
- Other findings: None.

IMPRESSION:

BI-RADS CATEGORY: [Category]

Category 1: Negative
Category 2: Benign finding(s)
Category 3: Probably benign - short interval follow-up suggested
Category 4: Suspicious abnormality - biopsy should be considered
Category 5: Highly suggestive of malignancy - appropriate action should be taken
Category 6: Known biopsy-proven malignity

[Specific findings and recommendations based on category]

FOLLOW-UP RECOMMENDATIONS:
- Routine annual screening mammography. [Or specific follow-up]
- [Additional imaging if needed]`,
    categoryName: 'Mammography',
    bodyPartName: 'Breast',
    modality: 'Mammography',
    tags: 'mammography,screening,breast,BI-RADS,cancer screening',
  },

  // Nuclear Medicine Templates
  {
    title: 'PET-CT Whole Body',
    description: 'FDG PET-CT for oncologic evaluation',
    content: `FDG PET-CT WHOLE BODY

INDICATION: [Indication - cancer staging, restaging, treatment response]

TECHNIQUE: Whole body FDG PET-CT was performed from skull base to mid-thigh approximately [time] minutes following intravenous administration of [dose] mCi of F-18 FDG. The patient fasted for at least 4 hours prior to injection. Blood glucose at time of injection: [mg/dL].

Low-dose CT was performed for anatomic localization and attenuation correction.

COMPARISON: [Previous PET-CT: date], [Other relevant imaging]

FINDINGS:

BRAIN:
- FDG uptake: Normal. [Hypometabolism, hypermetabolism]
- CT findings: [Describe]

HEAD AND NECK:
- Physiologic uptake in tonsils, salivary glands.
- [Abnormal uptake: location, SUVmax]

THORAX:
- Lungs: [Nodules/masses with FDG uptake, SUVmax]
- Mediastinum: [Lymph nodes, SUVmax]
- Pleura: [Effusion, nodules]
- Chest wall: [Findings]
- Breast: [Findings]

HEART:
- Myocardial uptake: [Present/Absent]

ABDOMEN:
- Liver: [FDG avid lesions, SUVmax]
- Adrenals: [Findings]
- Pancreas: [Findings]
- GI tract: [Physiologic/abnormal uptake]
- Kidneys: [Findings]

PELVIS:
- Bladder: Physiologic activity.
- Reproductive organs: [Findings]
- Pelvic lymph nodes: [Findings]

MUSCULOSKELETAL:
- Bones: [FDG avid lesions, SUVmax]
- Muscles: [Physiologic/abnormal uptake]

OTHER FINDINGS:
- Brown fat uptake: [Present/Location]
- Inflammatory changes: [Location]

QUANTITATIVE ANALYSIS:
- Reference: Liver SUVmean [value], SUVmax [value]
- Blood pool SUVmax: [value]
- Lesion SUVmax values as noted above.

TREATMENT RESPONSE (if applicable):
- [Comparison with prior, PERCIST criteria if used]

IMPRESSION:
1. [Primary oncologic findings with staging implications]
2. [Complete metabolic response / Partial response / Progressive disease / Stable disease]
3. [Incidental findings]
4. [Recommendations]`,
    categoryName: 'Nuclear Medicine',
    bodyPartName: 'Whole Body',
    modality: 'PET',
    tags: 'PET-CT,FDG,oncology,staging,treatment response,cancer',
  },
  {
    title: 'Bone Scan Whole Body',
    description: 'Whole body bone scintigraphy',
    content: `BONE SCAN WHOLE BODY

INDICATION: [Indication - metastatic screening, bone pain, prosthesis evaluation]

TECHNIQUE: Whole body bone scintigraphy was performed approximately [time] hours following intravenous administration of [dose] mCi of Tc-99m MDP. Multiple static and whole body images were obtained.

COMPARISON: [Previous bone scan: date], [Other imaging]

FINDINGS:

WHOLE BODY SURVEY:
- Overall pattern: Normal physiologic distribution. [Metastatic pattern, superscan]

SKULL:
- [Normal/Abnormal uptake - location, intensity]

CERVICAL SPINE:
- [Findings]

THORACIC SPINE:
- [Findings]

LUMBAR SPINE:
- [Findings]

SACRUM AND SACROILIAC JOINTS:
- [Findings]

RIBS:
- [Findings - focal vs linear, trauma vs metastatic pattern]

STERNUM:
- [Findings]

SHOULDERS:
- [Findings]

HUMERI:
- [Findings]

FOREARMS AND HANDS:
- [Findings]

PELVIS:
- [Findings - SI joints, pubic symphysis]

FEMORA:
- [Findings]

KNEES:
- [Findings]

LOWER LEGS AND FEET:
- [Findings]

SOFT TISSUE UPTAKE:
- [None / Present: location]

RENAL AND URINARY TRACT:
- Normal renal excretion. [Hydronephrosis, retention]

SPECIFIC LESIONS:
- [Number, location, intensity of abnormal foci]

IMPRESSION:
1. [No evidence of osseous metastatic disease] OR
2. [Number of abnormal foci suspicious for metastatic disease at locations:]
3. [Degenerative/traumatic findings]
4. [Recommendations for additional imaging or follow-up]`,
    categoryName: 'Nuclear Medicine',
    bodyPartName: 'Whole Body',
    modality: 'Nuclear Medicine',
    tags: 'bone scan,metastasis,skeletal,oncology,nuclear medicine',
  },
]

const snippets = [
  {
    title: 'Normal Findings Phrase',
    description: 'Standard phrase for normal findings',
    content: 'No acute abnormality. Unremarkable appearance.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'normal,unremarkable',
  },
  {
    title: 'No Acute Fracture',
    description: 'Phrase for negative fracture assessment',
    content: 'No acute fracture identified. No displaced fracture.',
    categoryName: 'X-Ray',
    modality: 'X-Ray',
    tags: 'fracture,trauma,negative',
  },
  {
    title: 'No Pulmonary Embolism',
    description: 'Negative PE finding',
    content: 'No pulmonary embolism identified. Pulmonary arteries are patent.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'PE,pulmonary embolism,CTPA,negative',
  },
  {
    title: 'No Acute Infarct',
    description: 'Negative stroke finding on MRI',
    content: 'No restricted diffusion to suggest acute infarction. No DWI abnormality.',
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'stroke,infarct,DWI,MRI,negative',
  },
  {
    title: 'Mild Degenerative Changes',
    description: 'Common degenerative finding',
    content: 'Mild degenerative changes with small osteophytes and minimal joint space narrowing.',
    categoryName: 'X-Ray',
    modality: 'X-Ray',
    tags: 'degenerative,osteoarthritis,DJD',
  },
  {
    title: 'Small Nodule - Follow-up Recommended',
    description: 'Recommendation for pulmonary nodule follow-up',
    content: 'Small pulmonary nodule measuring [size] mm. Recommend follow-up CT in 12 months per Fleischner guidelines for low-risk patients.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'nodule,lung,follow-up,Fleischner',
  },
  {
    title: 'Recommend Clinical Correlation',
    description: 'Standard recommendation phrase',
    content: 'Recommend clinical correlation and correlation with symptoms.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,clinical correlation',
  },
  {
    title: 'Recommend MRI for Further Evaluation',
    description: 'CT to MRI recommendation',
    content: 'Recommend MRI for further evaluation given the limitations of CT in this region.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'MRI,recommendation,follow-up',
  },
  {
    title: 'Stable Compared to Prior',
    description: 'Comparison with prior examination',
    content: 'Findings are stable compared to prior examination dated [date].',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'stable,comparison,follow-up',
  },
  {
    title: 'Simple Renal Cyst',
    description: 'Description of simple renal cyst',
    content: 'Simple renal cyst with thin wall, anechoic internally, and increased through-transmission, consistent with benign simple cyst. No further evaluation needed.',
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'Ultrasound',
    tags: 'cyst,kidney,benign,renal',
  },
  {
    title: 'Disc Herniation Description',
    description: 'Template for describing disc herniation',
    content: '[Level] disc [protrusion/extrusion], [central/paracentral/foraminal], measuring approximately [size] mm, resulting in [mild/moderate/severe] [canal stenosis/neural foraminal narrowing/thecal sac compression].',
    categoryName: 'MRI',
    bodyPartName: 'Spine',
    modality: 'MRI',
    tags: 'disc,herniation,spine,stenosis',
  },
  {
    title: 'No Hydrocephalus',
    description: 'Normal ventricular assessment',
    content: 'Ventricles and sulci are normal in size and configuration. No hydrocephalus.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'hydrocephalus,ventricles,brain,normal',
  },
  {
    title: 'No Pneumoperitoneum',
    description: 'Negative free air finding',
    content: 'No free intraperitoneal air. No pneumoperitoneum.',
    categoryName: 'X-Ray',
    bodyPartName: 'Abdomen',
    modality: 'X-Ray',
    tags: 'pneumoperitoneum,free air,abdomen',
  },
  {
    title: 'Cardiomediastinal Silhouette Normal',
    description: 'Normal heart size on chest X-ray',
    content: 'Cardiomediastinal silhouette is within normal limits. Cardiothoracic ratio is less than 0.5.',
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'cardiac,heart,normal,CT ratio',
  },
  {
    title: 'No Pleural Effusion',
    description: 'Negative pleural effusion finding',
    content: 'No pleural effusion. No pneumothorax. Pleural surfaces are clear.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'pleural,effusion,pneumothorax',
  },
  {
    title: 'Gallbladder Normal',
    description: 'Normal gallbladder ultrasound',
    content: 'Gallbladder is normal in size with thin wall (less than 3 mm). No gallstones, sludge, or pericholecystic fluid.',
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'Ultrasound',
    tags: 'gallbladder,normal,ultrasound',
  },
  {
    title: 'Meniscus Tear Description',
    description: 'Template for meniscal tear',
    content: '[Medial/Lateral] meniscus [anterior horn/body/posterior horn] [radial/complex/oblique/vertical] tear, [complete/incomplete], extending to the [superior/inferior] articular surface.',
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'meniscus,tear,knee,sports',
  },
  {
    title: 'ACL Tear Description',
    description: 'Template for ACL injury',
    content: 'Anterior cruciate ligament shows [complete/partial] tear with [abnormal orientation/edema/hemorrhage] within the ligament. [Secondary signs: bone bruise pattern, anterior tibial translation, uncovered posterior horn sign].',
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'ACL,tear,knee,sports',
  },
  {
    title: 'Rotator Cuff Tear Description',
    description: 'Template for rotator cuff tear',
    content: '[Supraspinatus/Infraspinatus/Subscapularis] tendon demonstrates [full-thickness/partial-thickness] tear. Full-thickness tear measures approximately [size] mm in [AP/ML] dimension. [Retraction: present/absent]. [Muscle atrophy: present/absent].',
    categoryName: 'MRI',
    bodyPartName: 'Upper Extremity',
    modality: 'MRI',
    tags: 'rotator cuff,tear,shoulder,sports',
  },
  {
    title: 'BI-RADS 2 - Benign',
    description: 'BI-RADS Category 2 assessment',
    content: 'BI-RADS 2: Benign finding. Routine screening mammography recommended in 1 year.',
    categoryName: 'Mammography',
    bodyPartName: 'Breast',
    modality: 'Mammography',
    tags: 'BI-RADS,benign,mammography,breast',
  },
  {
    title: 'TI-RADS Categories',
    description: 'TI-RADS category descriptions',
    content: 'TI-RADS 1: Benign - No FNA needed\nTI-RADS 2: Not suspicious - No FNA needed\nTI-RADS 3: Mildly suspicious - FNA if ≥2.5cm\nTI-RADS 4: Moderately suspicious - FNA if ≥1.5cm\nTI-RADS 5: Highly suspicious - FNA if ≥1cm',
    categoryName: 'Ultrasound',
    bodyPartName: 'Neck',
    modality: 'Ultrasound',
    tags: 'TI-RADS,thyroid,nodule,biopsy',
  },
]

async function main() {
  console.log('Starting seed...')

  // Create categories
  console.log('Creating categories...')
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  // Create body parts
  console.log('Creating body parts...')
  for (const bodyPart of bodyParts) {
    await prisma.bodyPart.upsert({
      where: { name: bodyPart.name },
      update: {},
      create: bodyPart,
    })
  }

  // Create templates
  console.log('Creating templates...')
  for (const template of templates) {
    const category = template.categoryName
      ? await prisma.category.findUnique({ where: { name: template.categoryName } })
      : null
    const bodyPart = template.bodyPartName
      ? await prisma.bodyPart.findUnique({ where: { name: template.bodyPartName } })
      : null

    await prisma.template.create({
      data: {
        title: template.title,
        description: template.description,
        content: template.content,
        categoryId: category?.id,
        bodyPartId: bodyPart?.id,
        modality: template.modality,
        tags: template.tags,
      },
    })
  }

  // Create snippets
  console.log('Creating snippets...')
  for (const snippet of snippets) {
    const category = snippet.categoryName
      ? await prisma.category.findUnique({ where: { name: snippet.categoryName } })
      : null
    const bodyPart = snippet.bodyPartName
      ? await prisma.bodyPart.findUnique({ where: { name: snippet.bodyPartName } })
      : null

    await prisma.snippet.create({
      data: {
        title: snippet.title,
        description: snippet.description,
        content: snippet.content,
        categoryId: category?.id,
        bodyPartId: bodyPart?.id,
        modality: snippet.modality,
        tags: snippet.tags,
      },
    })
  }

  console.log('Seed completed!')
  console.log(`Created ${categories.length} categories`)
  console.log(`Created ${bodyParts.length} body parts`)
  console.log(`Created ${templates.length} templates`)
  console.log(`Created ${snippets.length} snippets`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
