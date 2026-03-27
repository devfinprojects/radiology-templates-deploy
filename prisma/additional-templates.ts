import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Additional comprehensive templates based on radreport.org standards
const additionalTemplates = [
  // ========== ADDITIONAL CT TEMPLATES ==========
  {
    title: 'CT Brain - Routine Non-Contrast',
    description: 'Standard non-contrast CT brain for headache, altered mental status',
    content: `CT BRAIN WITHOUT CONTRAST

EXAMINATION: Non-contrast computed tomography of the brain.

CLINICAL INDICATION: [Indication]

TECHNIQUE: Axial images were obtained through the brain from the skull base to the vertex without intravenous contrast.

COMPARISON: [Previous imaging if available]

FINDINGS:

BRAIN PARENCHYMA:
- No acute intracranial hemorrhage.
- No acute infarction. Gray-white differentiation is preserved.
- No mass or mass effect.
- No abnormal hypoattenuation or hyperattenuation.
- [Describe any chronic findings]

VENTRICLES AND EXTRA-AXIAL SPACES:
- Ventricles and sulci are normal in size and configuration.
- No hydrocephalus.
- No extra-axial collection.
- No midline shift.

CALVARIUM:
- No acute fracture.
- No suspicious lytic or blastic lesions.

PARANASAL SINUSES AND MASTOID AIR CELLS:
- Clear. No air-fluid levels.
- [Chronic mucosal thickening if present]

SOFT TISSUES:
- Unremarkable.

VISUALIZED ORBITS:
- Unremarkable.

IMPRESSION:
1. No acute intracranial abnormality.
2. [Chronic/incidental findings if any]`,
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'ct,brain,non-contrast,headache,trauma,stroke',
  },
  {
    title: 'CT Chest - Routine with Contrast',
    description: 'Contrast-enhanced CT chest for mass, infection, or staging',
    content: `CT CHEST WITH CONTRAST

EXAMINATION: Contrast-enhanced computed tomography of the chest.

CLINICAL INDICATION: [Indication]

TECHNIQUE: Helical CT images were obtained through the chest following administration of [X] mL of intravenous iodinated contrast. Images reviewed in axial, coronal, and sagittal planes.

COMPARISON: [Previous imaging if available]

FINDINGS:

LUNGS:
- Lung parenchyma: [Clear/Describe nodules, masses, infiltrates, emphysema]
- Airway patency: [Patent/Describe obstruction]
- [Lung nodule description if present: size, location, characteristics]

PLEURA:
- No pleural effusion.
- No pneumothorax.
- [Pleural thickening or plaques if present]

MEDIASTINUM AND HILUM:
- Heart: Normal size. No pericardial effusion.
- Great vessels: Unremarkable.
- Lymph nodes: No enlarged mediastinal or hilar lymph nodes.
- Esophagus: Unremarkable.

CHEST WALL AND DIAPHRAGM:
- Unremarkable.

UPPER ABDOMEN:
- Liver: [Describe]
- Spleen: [Describe]
- Adrenal glands: [Describe]
- Other: [Describe]

BONES:
- No suspicious osseous lesions.

IMPRESSION:
1. [Primary finding]
2. [Secondary findings]
3. [Recommendations]`,
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'ct,chest,contrast,lung,mass,nodule,staging',
  },
  {
    title: 'CT Abdomen/Pelvis - Routine with Contrast',
    description: 'Standard contrast-enhanced CT of abdomen and pelvis',
    content: `CT ABDOMEN AND PELVIS WITH CONTRAST

EXAMINATION: Contrast-enhanced computed tomography of the abdomen and pelvis.

CLINICAL INDICATION: [Indication]

TECHNIQUE: Helical CT images were obtained through the abdomen and pelvis following administration of [X] mL of intravenous iodinated contrast. [Oral contrast if used]. Multiplanar reformations reviewed.

COMPARISON: [Previous imaging if available]

FINDINGS:

LIVER:
- Size: Normal.
- Parenchyma: Homogeneous enhancement.
- No focal hepatic lesion.
- Portal vein: Patent.
- Biliary tree: Normal caliber.

GALLBLADDER AND BILIARY:
- Gallbladder: Unremarkable.
- CBD: Normal caliber.

PANCREAS:
- Size and morphology: Normal.
- Pancreatic duct: Normal.

SPLEEN:
- Size: Normal.
- Parenchyma: Homogeneous.

ADRENAL GLANDS:
- Unremarkable bilaterally.

KIDNEYS AND URETERS:
- Kidneys: Normal in size and enhancement bilaterally.
- No nephrolithiasis or hydronephrosis.
- Ureters: Unremarkable.

BLADDER:
- Unremarkable.

GASTROINTESTINAL TRACT:
- Stomach: Unremarkable.
- Small bowel: Unremarkable. No obstruction.
- Colon: Unremarkable.
- Appendix: [If visualized, describe]

LYMPH NODES:
- No pathologic lymphadenopathy.

VESSELS:
- Aorta and IVC: Unremarkable.

PERITONEUM:
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
    tags: 'ct,abdomen,pelvis,contrast,abdominal pain',
  },
  {
    title: 'CT CTA Aorta - Aneurysm Evaluation',
    description: 'CT angiography of the aorta for aneurysm assessment',
    content: `CT ANGIOGRAPHY - AORTA

EXAMINATION: CT angiography of the [thoracic/abdominal/thoracoabdominal] aorta.

CLINICAL INDICATION: [Indication - known or suspected aneurysm, dissection, follow-up]

TECHNIQUE: CT angiography performed following bolus administration of [X] mL of intravenous iodinated contrast. Images reviewed in axial, coronal, sagittal planes with MIP and 3D reformats.

COMPARISON: [Previous imaging if available]

FINDINGS:

AORTIC ANEURYSM:
- Location: [Ascending/Arch/Descending thoracic/Abdominal/Thoracoabdominal].
- Maximum diameter: [X] mm at [level].
- Length of aneurysm: [X] cm.
- Morphology: [Fusiform/Saccular].
- Wall: [Smooth/Irregular/Calcified/Thrombus present].
- Intraluminal thrombus: [Absent/Present - circumferential thickness X mm].

AORTIC DISSECTION:
- [No evidence of dissection / Dissection present].
- Type: [Stanford A/B, DeBakey I/II/III].
- Intimal flap: [Location].
- True lumen: [Size, flow].
- False lumen: [Size, flow, thrombosis].
- Branch vessel involvement: [Describe].

MEASUREMENTS:
- Sinus of Valsalva: [X] mm.
- Sinotubular junction: [X] mm.
- Mid-ascending aorta: [X] mm.
- Proximal arch: [X] mm.
- Mid-arch: [X] mm.
- Proximal descending: [X] mm.
- Mid-descending: [X] mm.
- Diaphragmatic hiatus: [X] mm.
- Celiac axis level: [X] mm.
- Renal artery level: [X] mm.
- Infrarenal: [X] mm.
- Bifurcation: [X] mm.

BRANCH VESSELS:
- Innominate: [Patent/Stenosis/Occlusion].
- Left common carotid: [Patent/Stenosis/Occlusion].
- Left subclavian: [Patent/Stenosis/Occlusion].
- Celiac axis: [Patent/Stenosis/Occlusion].
- SMA: [Patent/Stenosis/Occlusion].
- Renal arteries: [Patent/Stenosis/Occlusion].
- Iliac arteries: [Patent/Aneurysm/Occlusion].

SURROUNDING STRUCTURES:
- [Adjacent organ findings].
- [Retroperitoneal hematoma if present].

PRIOR INTERVENTION:
- [No prior intervention / Describe graft, stent, status].

IMPRESSION:
1. [Aneurysm/Dissection description].
2. Maximum diameter: [X] mm at [location].
3. [Interval change if comparison available].
4. [Branch vessel status].
5. [Recommendations for intervention or follow-up].

RECOMMENDATIONS:
- [Surveillance interval based on size].
- [Vascular surgery referral if indicated].`,
    categoryName: 'CT',
    bodyPartName: 'Vascular',
    modality: 'CT',
    tags: 'ct,CTA,aorta,aneurysm,dissection,vascular',
  },
  {
    title: 'CT Cervical Spine - Trauma',
    description: 'CT cervical spine for trauma evaluation',
    content: `CT CERVICAL SPINE - TRAUMA

EXAMINATION: Computed tomography of the cervical spine.

CLINICAL INDICATION: [Indication - trauma, neck pain, neurological deficit]

TECHNIQUE: Helical CT images were obtained through the cervical spine from the skull base to the thoracic inlet. Axial, sagittal, and coronal reformations reviewed.

COMPARISON: [Previous imaging if available]

FINDINGS:

VERTEBRAL ALIGNMENT:
- Cervical lordosis: [Normal/Decreased/Reversed].
- No listhesis. [Or describe anterolisthesis/retrolisthesis at level, grade].

VERTEBRAL BODIES:
- C1 (Atlas): [Intact/Fracture].
- C2 (Axis): [Intact/Fracture - describe type].
- C3-C7: [No acute fracture / Fracture at ___].
- [Compression fractures: vertebral body, height loss percentage].
- [Burst fracture: retropulsion, canal compromise].

DENS (C2):
- [Intact/Fracture].
- Type: [I - tip, II - base, III - body].
- Atlantodental interval: [X] mm (normal <3 mm).

FACET JOINTS:
- Facet alignment: [Normal/Subluxation/Dislocation/Bilateral jumped facets].
- Location: [Level, side].

POSTERIOR ELEMENTS:
- Lamina: [Intact/Fractured].
- Spinous processes: [Intact/Fractured].
- Pedicles: [Intact/Fractured].

INTERVERTEBRAL DISC SPACES:
- Heights: [Maintained/Narrowed at ___].

PREVERTEBRAL SOFT TISSUE:
- C1-C3: [X] mm (normal <7 mm).
- C4-C7: [X] mm (normal <22 mm).
- [Normal/Widened - suggests hematoma/edema].

SPINAL CANAL:
- AP diameter: [Adequate/Stenosis].
- Canal compromise: [None/From fracture fragment/From hematoma].
- Cord compression: [None/Present].

NEURAL FORAMINA:
- [Patent/Narrowed at level, side].

SOFT TISSUES:
- Paraspinal muscles: [Normal/Swelling].
- Neck soft tissues: [Normal/Swelling/hematoma].

INCIDENTAL FINDINGS:
- [Describe].

IMPRESSION:
1. [Fracture: None/Describe type, level, stability].
2. [Alignment: Normal/Malalignment at ___].
3. [Soft tissue swelling: None/Present].
4. [Spinal canal: Adequate/Compromised].
5. [Stable/Unstable injury pattern].

RECOMMENDATIONS:
[MRI if neurological deficit / Clinical correlation / Cervical collar / Neurosurgery consultation].`,
    categoryName: 'CT',
    bodyPartName: 'Cervical Spine',
    modality: 'CT',
    tags: 'ct,cervical,spine,trauma,fracture,neck',
  },
  {
    title: 'CT Lumbar Spine - Degenerative',
    description: 'CT lumbar spine for degenerative disease evaluation',
    content: `CT LUMBAR SPINE - DEGENERATIVE DISEASE

EXAMINATION: Computed tomography of the lumbar spine.

CLINICAL INDICATION: [Indication - back pain, radiculopathy, stenosis]

TECHNIQUE: Helical CT images were obtained through the lumbar spine. Axial, sagittal, and coronal reformations reviewed. Bone and soft tissue windows.

COMPARISON: [Previous imaging if available]

FINDINGS:

VERTEBRAL ALIGNMENT:
- Lumbar lordosis: [Normal/Decreased/Reversed].
- Spondylolisthesis: [None/Anterolisthesis at level, grade].

VERTEBRAL BODIES:
- L1-L5: Heights maintained. [Or describe compression fractures].
- Endplate changes: [Normal/Modic changes/Schmorl nodes].
- Osteophytes: [None/Mild/Moderate/Severe at ___].
- Bone density: [Normal/Diffuse osteopenia].

DISC SPACES BY LEVEL:
L1-L2:
- Disc height: [Normal/Decreased].
- Disc bulge: [None/Mild/Moderate].
- Disc herniation: [None/Describe].
- Canal stenosis: [None/Mild/Moderate/Severe].

L2-L3:
- [Similar description].

L3-L4:
- [Similar description].

L4-L5:
- [Similar description].

L5-S1:
- [Similar description].

SPINAL CANAL:
- Diameter: [Normal AP >12 mm / Stenosis].
- Cause: [Disc bulge/Facet hypertrophy/Ligamentum flavum thickening].

NEURAL FORAMINA:
- [Level by level assessment].
- [Patent/Narrowed at level, side, severity].

FACET JOINTS:
- [Level by level].
- [Normal/Hypertrophic/Arthropathy].
- Joint effusion: [None/Present].

LIGAMENTUM FLAVUM:
- [Normal/Hypertrophic].
- Thickness: [X] mm (abnormal if >4 mm).

SACROILIAC JOINTS:
- [Normal/Sacroiliitis/Ankylosis].

PARASPINAL SOFT TISSUES:
- [Normal/Abnormal].

IMPRESSION:
1. DEGENERATIVE CHANGES:
   - Most significant level: [___].
   - Disc disease: [Describe].
   - Canal stenosis: [Level, severity].
   - Foraminal stenosis: [Level, side, severity].
2. [Spondylolisthesis if present].
3. [Compression fractures if present].
4. [Comparison to prior if available].

RECOMMENDATIONS:
[Clinical correlation / MRI if needed for disc/cord evaluation / Physical therapy].`,
    categoryName: 'CT',
    bodyPartName: 'Lumbar Spine',
    modality: 'CT',
    tags: 'ct,lumbar,spine,degenerative,stenosis,radiculopathy',
  },
  {
    title: 'CT Kidneys - Renal Mass Protocol',
    description: 'CT for renal mass characterization',
    content: `CT KIDNEYS - RENAL MASS PROTOCOL

EXAMINATION: CT of the abdomen with multiphase renal protocol.

CLINICAL INDICATION: [Indication - renal mass, hematuria, known lesion]

TECHNIQUE: Multiphase CT of the abdomen performed including:
- Non-contrast phase
- Corticomedullary phase (25-35 seconds)
- Nephrographic phase (80-100 seconds)
- [Excretory phase if needed]

COMPARISON: [Previous imaging if available]

FINDINGS:

RENAL MASS:
- Location: [Right/Left kidney, upper/mid/lower pole, anterior/posterior].
- Size: [X] x [X] x [X] cm.
- Morphology: [Solid/Cystic/Mixed].

ATTENUATION VALUES (HU):
- Non-contrast: [X] HU.
- Corticomedullary phase: [X] HU.
- Nephrographic phase: [X] HU.
- Enhancement: [X] HU (abnormal if >15-20 HU).

ENHANCEMENT PATTERN:
- [Homogeneous/Heterogeneous].
- [Peripheral/Nodal/Septal enhancement].

CHARACTERISTICS:
- Margins: [Well-circumscribed/Irregular/Infiltrative].
- Interface with renal sinus fat: [Preserved/Lost].
- Interface with perinephric fat: [Preserved/Lost].
- Calcification: [Absent/Present - describe].
- Fat within lesion: [Absent/Present - suggests angiomyolipoma].
- Necrosis: [Absent/Present].

BOSNIAK CLASSIFICATION (if cystic):
- Category I: Simple cyst - water density, thin wall, no enhancement.
- Category II: Minimally complex - thin septa, fine calcification.
- Category IIF: Follow-up - thick septa, nodular calcification.
- Category III: Indeterminate - thick irregular septa, enhancing nodules.
- Category IV: Malignant - solid enhancing components.

LOCAL STAGING:
- Renal vein involvement: [None/Thrombus present].
- IVC involvement: [None/Thrombus present].
- Perinephric fat invasion: [None/Present].
- Adrenal involvement: [None/Present].
- Lymphadenopathy: [None/Describe].

CONTRALATERAL KIDNEY:
- [Normal/Describe abnormalities].

REST OF ABDOMEN:
- Liver: [Findings].
- Adrenals: [Findings].
- Other: [Findings].

IMPRESSION:
1. RENAL MASS:
   - Location: [___].
   - Size: [X] cm.
   - Enhancement: [X] HU.
   - [Bosniak category if cystic].
   - [Most likely diagnosis].
2. LOCAL STAGING: [T1/T2/T3a/T3b/T3c/T4].
3. [Lymph node status].
4. [Comparison to prior if available].

RECOMMENDATIONS:
[Urology referral / Partial vs radical nephrectomy consideration / Ablation if indicated / Follow-up if Bosniak IIF].`,
    categoryName: 'CT',
    bodyPartName: 'Kidneys',
    modality: 'CT',
    tags: 'ct,kidney,renal,mass,Bosniak,enhancement,nephron',
  },
  {
    title: 'CT Pancreas - Pancreatitis Protocol',
    description: 'CT for acute or chronic pancreatitis evaluation',
    content: `CT PANCREAS - PANCREATITIS PROTOCOL

EXAMINATION: Contrast-enhanced CT of the abdomen with pancreatic protocol.

CLINICAL INDICATION: [Indication - acute pancreatitis, chronic pancreatitis, pancreatic mass]

TECHNIQUE: CT of the abdomen performed with IV contrast in pancreatic parenchymal phase (40-50 sec) and portal venous phase. Thin-section images obtained.

COMPARISON: [Previous imaging if available]

FINDINGS:

PANCREAS:
- Size: [Normal/Enlarged].
- Parenchymal enhancement: [Normal/Heterogeneous/Decreased].
- Focal lesions: [None/Describe].
- Necrosis: [None/Partial/Complete - extent X%].
- Peripancreatic fat: [Normal/Stranding/Fluid].
- Pancreatic duct: [Normal/Dilated - X mm].

ACUTE PANCREATITIS FEATURES:
- Balthazar Grade:
  * Grade A: Normal pancreas.
  * Grade B: Focal or diffuse enlargement.
  * Grade C: Pancreatic gland abnormalities with peripancreatic inflammation.
  * Grade D: Single fluid collection.
  * Grade E: Two or more fluid collections or gas in/adjacent to pancreas.

- CT Severity Index (CTSI):
  * Necrosis: 0% (0 pts), <30% (2 pts), 30-50% (4 pts), >50% (6 pts).
  * Inflammation: Normal (0), B (1), C (2), D (3), E (4).
  * Total score: [X]/10.

FLUID COLLECTIONS:
- Acute peripancreatic fluid collection: [Present/Absent].
  * Location: [___].
  * Size: [X] x [X] cm.
- Acute necrotic collection: [Present/Absent].
- Walled-off necrosis: [Present/Absent].
  * Wall maturity: [Immature/Mature].
- Pseudocyst: [Present/Absent].
  * Size: [X] cm.
  * Location: [___].

COMPLICATIONS:
- Pancreatic necrosis: [Absent/Partial/Complete].
- Infection: [No evidence/Gas suggests infection].
- Vascular complications:
  * Splenic vein thrombosis: [Absent/Present].
  * Portal vein thrombosis: [Absent/Present].
  * Pseudoaneurysm: [Absent/Present].
- Biliary obstruction: [Absent/Present].
- Gastric outlet obstruction: [Absent/Present].

BILIARY TREE:
- Gallstones: [Present/Absent].
- CBD stones: [Present/Absent].
- CBD diameter: [X] mm.

CHRONIC PANCREATITIS FEATURES (if applicable):
- Gland atrophy: [Present/Absent].
- Ductal dilation: [Present - chain of lakes/Uniform].
- Calcifications: [Present/Absent].
- Pancreatic duct stones: [Present/Absent].

OTHER ABDOMINAL FINDINGS:
- [Liver, spleen, kidneys, other].

IMPRESSION:
1. [Acute/Chronic] pancreatitis.
2. Balthazar grade: [A-E].
3. CT Severity Index: [X]/10.
4. Necrosis: [Absent/X%].
5. Complications: [List].
6. [Comparison to prior if available].

RECOMMENDATIONS:
[Clinical management / Interventional radiology if infected necrosis / Follow-up CT].`,
    categoryName: 'CT',
    bodyPartName: 'Abdomen',
    modality: 'CT',
    tags: 'ct,pancreas,pancreatitis,Balthavar,CTSI,necrosis',
  },

  // ========== ADDITIONAL MRI TEMPLATES ==========
  {
    title: 'MRI Brain - Seizure Protocol',
    description: 'MRI brain for seizure evaluation',
    content: `MRI BRAIN - SEIZURE PROTOCOL

EXAMINATION: MRI brain with and without contrast, epilepsy protocol.

CLINICAL INDICATION: [Indication - new onset seizure, epilepsy evaluation]

TECHNIQUE: Multiplanar multisequence MRI of the brain including:
- Sagittal T1, T2
- Axial T1, T2, FLAIR, DWI, ADC
- Coronal T2, FLAIR (perpendicular to hippocampus)
- High-resolution coronal T2 through mesial temporal lobes
- Post-contrast T1 in axial, coronal, sagittal planes

COMPARISON: [Previous imaging if available]

FINDINGS:

MESIAL TEMPORAL LOBES:
- Right hippocampus: [Normal size and signal / Atrophic / T2/FLAIR hyperintense].
- Left hippocampus: [Normal size and signal / Atrophic / T2/FLAIR hyperintense].
- Hippocampal volume: [Symmetric/Asymmetric - smaller on side].
- Internal architecture: [Preserved/Lost].

TEMPORAL LOBES:
- Temporal pole: [Normal/Abnormal].
- Temporal white matter: [Normal/Abnormal].

CORTEX:
- Cortical thickness: [Normal/Focal thickening].
- Cortical signal: [Normal/Focal T2/FLAIR hyperintensity].
- Areas of cortical dysplasia: [None/Describe location].
- Polymicrogyria: [None/Describe].
- Heterotopia: [None/Describe].

WHITE MATTER:
- Normal myelination for age.
- No focal T2/FLAIR signal abnormality.
- [Describe any white matter lesions].

Ventricles:
- Symmetric, normal size.
- No hippocampal sclerosis signs (dilated temporal horn).

ENHANCEMENT:
- No abnormal parenchymal enhancement.
- No leptomeningeal enhancement.

CONGENITAL ANOMALIES:
- Corpus callosum: [Normal/Agenesis/Hypogenesis].
- Migrational abnormalities: [None/Describe].
- Arachnoid cysts: [None/Describe].

NO EVIDENCE OF:
- Space-occupying lesion.
- Vascular malformation.
- Post-traumatic changes.
- Encephalitis or inflammation.

IMPRESSION:
1. [Normal/Mesial temporal sclerosis - side].
2. [Focal cortical dysplasia if present - location].
3. [Other epileptogenic findings].
4. [If normal: No structural cause for seizure identified].

RECOMMENDATIONS:
[EEG correlation / Epileptology referral / Follow-up as clinically indicated].`,
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'mri,brain,seizure,epilepsy,hippocampal sclerosis,MTS',
  },
  {
    title: 'MRI Pituitary - Sella Protocol',
    description: 'MRI pituitary for sellar lesions',
    content: `MRI PITUITARY - SELLA PROTOCOL

EXAMINATION: MRI of the sella with and without contrast.

CLINICAL INDICATION: [Indication - hyperprolactinemia, visual field defect, known pituitary lesion]

TECHNIQUE: High-resolution MRI of the sella including:
- Sagittal and coronal T1
- Coronal T2
- Dynamic post-contrast T1 through sella
- Post-contrast T1 in sagittal and coronal planes

COMPARISON: [Previous imaging if available]

FINDINGS:

PITUITARY GLAND:
- Size: [Normal - height X mm / Enlarged].
- Superior margin: [Flat/Convex].
- Signal characteristics:
  * T1: [Isointense/Hyperintense/Hypointense].
  * T2: [Isointense/Hyperintense/Hypointense].
- Enhancement pattern: [Homogeneous/Heterogeneous].

PITUITARY LESION:
- Location: [Right/left/midline/central].
- Size: [X] x [X] x [X] mm.
- Microadenoma: <10 mm / Macroadenoma: ≥10 mm.
- Signal: T1 [hypointense/isointense/hyperintense], T2 [describe].
- Enhancement: [Less than normal gland/Enhances/Heterogeneous].
- Cystic component: [Absent/Present].
- Hemorrhage: [Absent/Present].

EXTENSION:
- Superior extension: [None/Suprasellar].
  * Optic chiasm compression: [None/Present].
  * Distance to chiasm: [X] mm.
- Lateral extension: [None/Cavernous sinus].
  * Cavernous sinus invasion: [None/Right/Left/Bilateral].
  * Internal carotid artery encasement: [None/Describe percentage].
- Inferior extension: [None/Sphenoid sinus].

INFUNDIBULUM:
- Position: [Midline/Deviated].
- Thickness: [Normal/Thickened].

OPTIC CHIASM:
- Morphology: [Normal/Compressed/Stretched].
- Signal: [Normal/T2 hyperintense].

CAVERNOUS SINUS:
- [Normal/Invasion by tumor].
- Cranial nerves III-VI: [Normal/Abnormal].

SUPRASELLAR CISTERN:
- [Normal/Compressed].

SELLA:
- Size: [Normal/Enlarged].
- Floor: [Intact/Eroded].

REMAINING BRAIN:
- Unremarkable.

IMPRESSION:
1. [Normal pituitary / Microadenoma / Macroadenoma].
   - Size: [X] mm.
   - Location: [___].
   - [Extension if present].
2. [Optic chiasm status].
3. [Cavernous sinus status].
4. [Comparison to prior if available].

RECOMMENDATIONS:
[Endocrinology evaluation / Visual field testing / Follow-up MRI / Surgical consideration if indicated].`,
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'mri,pituitary,sella,adenoma,prolactinoma,macroadenoma',
  },
  {
    title: 'MRI Prostate - PI-RADS Protocol',
    description: 'Multiparametric MRI prostate for PI-RADS assessment',
    content: `MRI PROSTATE - PI-RADS ASSESSMENT

EXAMINATION: Multiparametric MRI of the prostate.

CLINICAL INDICATION: [Indication - elevated PSA, known prostate cancer, staging]

TECHNIQUE: Multiparametric MRI of the prostate including:
- T2-weighted imaging in axial, coronal, sagittal planes
- Diffusion-weighted imaging with ADC maps
- Dynamic contrast-enhanced imaging
- [Optional: MR spectroscopy]

COMPARISON: [Previous imaging if available]

FINDINGS:

PROSTATE GLAND:
- Volume: [X] cc (ellipsoid formula: 0.52 x L x W x H).
- Size: [Normal/Enlarged].
- Transition zone: [Normal/Benign prostatic hyperplasia].
- Peripheral zone: [Describe].
- Central zone: [Normal].
- Capsule: [Intact/Violated].

PERIPHERAL ZONE LESIONS:

LESION 1:
- Location: [Sector - e.g., PZpl, PZpm, PZal].
- Size: [X] x [X] mm.
- T2WI score (1-5):
  * 1: Homogeneous hyperintense.
  * 2: Linear/wedge-shaped hypointense.
  * 3: Heterogeneous or non-circumscribed hypointense.
  * 4: Circumscribed, homogeneous hypointense, <1.5 cm.
  * 5: Circumscribed, homogeneous hypointense, ≥1.5 cm.
- DWI/ADC score (1-5):
  * 1: No restriction.
  * 2: Linear/wedge-shaped restriction.
  * 3: Focal mildly restricted.
  * 4: Focal marked restriction, <1.5 cm.
  * 5: Focal marked restriction, ≥1.5 cm.
- DCE: [Negative/Positive].
- PI-RADS v2.1 SCORE: [1-5].

LESION 2:
- [Similar description].

TRANSITION ZONE LESIONS:
- [Describe if present, T2WI dominant sequence].

EXTRAPROSTATIC EXTENSION:
- Capsular bulge: [None/Present].
- Capsular penetration: [None/Present].
- Neurovascular bundle involvement: [None/Right/Left].
- Seminal vesicle invasion: [None/Present].

LYMPH NODES:
- Pelvic lymph nodes: [Normal/Enlarged].
- Size: [Describe enlarged nodes].

BONE:
- Osseous metastases: [None/Describe].

ADJACENT STRUCTURES:
- Bladder: [Normal/Abnormal].
- Rectum: [Normal/Abnormal].

PI-RADS v2.1 SCORING:
- PI-RADS 1: Very low - clinically significant cancer unlikely.
- PI-RADS 2: Low - clinically significant cancer unlikely.
- PI-RADS 3: Intermediate - clinically significant cancer equivocal.
- PI-RADS 4: High - clinically significant cancer likely.
- PI-RADS 5: Very high - clinically significant cancer highly likely.

IMPRESSION:
1. PROSTATE CANCER RISK ASSESSMENT:
   - Lesion 1: PI-RADS [X] at [location], size [X] mm.
   - [Additional lesions].
2. [Extraprostatic extension if present].
3. [Lymph node status].
4. [Bone status].
5. [Recommendations].

RECOMMENDATIONS:
- PI-RADS 1-2: No biopsy recommended.
- PI-RADS 3: Consider biopsy if PSA density >0.15 or other risk factors.
- PI-RADS 4-5: Biopsy recommended.
- [Targeted biopsy approach if indicated].`,
    categoryName: 'MRI',
    bodyPartName: 'Prostate',
    modality: 'MRI',
    tags: 'mri,prostate,PI-RADS,DWI,prostate cancer,PSA',
  },
  {
    title: 'MRI Female Pelvis - Pelvic Pain',
    description: 'MRI pelvis for female pelvic pain evaluation',
    content: `MRI FEMALE PELVIS

EXAMINATION: MRI of the pelvis with and without contrast.

CLINICAL INDICATION: [Indication - pelvic pain, mass, endometriosis]

TECHNIQUE: Multiplanar multisequence MRI of the pelvis including:
- Sagittal, axial, coronal T1 and T2
- Axial T1 fat-saturated pre and post contrast
- Diffusion-weighted imaging
- [Optional: saline-infused sonography correlation]

COMPARISON: [Previous imaging if available]

FINDINGS:

UTERUS:
- Size: [X] x [X] x [X] cm.
- Position: [Anteverted/Retroverted].
- Endometrium: Thickness [X] mm (premenopausal normal ≤16 mm).
- Endometrial signal: [Normal/T2 hyperintense lesion].
- Junctional zone: [Normal/Thickened - adenomyosis if ≥12 mm].
- Myometrium: [Homogeneous/Fibroids present].
- Fibroids: [Number, size, location, type].
- [Adenomyosis: Junctional zone thickening, T2 hyperintense foci].

CERVIX:
- Size: [Normal/Enlarged].
- Signal: [Normal/Abnormal].
- Nabothian cysts: [Present/Absent].

OVARIES:
- Right ovary: Size [X] x [X] cm. Volume [X] mL.
  * Follicles: [Normal/Polycystic appearance].
  * Cysts/lesions: [Describe - simple, endometrioma, dermoid, complex].
  * Enhancement: [Normal/Abnormal].
- Left ovary: Size [X] x [X] cm. Volume [X] mL.
  * [Similar description].

FALLOPIAN TUBES:
- [Normal/Dilated - hydrosalpinx].
- [Describe any abnormalities].

ADNEXA:
- Free fluid: [None/Small/Moderate].
- Masses: [None/Describe].
- Endometriomas: [Present/Absent - T1 hyperintense, T2 hypointense shading].
- Endometriosis implants: [Describe locations].

PELVIC FLOOR:
- [Normal/Descended organs].
- [Prolapse assessment if indicated].

BLADDER:
- [Normal/Wall thickening/Mass].
- Urinary bladder: [Well-distended/Underfilled].

RECTUM AND SIGMOID:
- [Normal/Abnormal].
- Endometriosis involvement: [None/Present].

LYMPH NODES:
- Pelvic: [Normal/Enlarged].
- Inguinal: [Normal/Enlarged].

PELVIC MUSCULATURE:
- [Normal/Abnormal].

BONES:
- Sacrum and sacroiliac joints: [Normal/Sacroiliitis].
- [Osseous lesions].

IMPRESSION:
1. UTERUS: [Normal/Fibroids/Adenomyosis].
2. OVARIES: [Normal/Describe lesions].
3. [Endometriosis staging if present].
4. [Other significant findings].
5. [Recommendations].

RECOMMENDATIONS:
[Clinical correlation / Gynecology referral / Follow-up imaging / Additional workup if indicated].`,
    categoryName: 'MRI',
    bodyPartName: 'Pelvis',
    modality: 'MRI',
    tags: 'mri,pelvis,female,endometriosis,fibroid,adenomyosis',
  },
  {
    title: 'MRI Breast - Diagnostic',
    description: 'Diagnostic breast MRI for high-risk screening or staging',
    content: `MRI BREAST - DIAGNOSTIC

EXAMINATION: MRI of the [bilateral/right/left] breast(s).

CLINICAL INDICATION: [Indication - high-risk screening, known malignancy, implant evaluation]

TECHNIQUE: Bilateral breast MRI performed with dedicated breast coil. Dynamic contrast-enhanced imaging obtained. Images reviewed in axial, sagittal, and coronal planes. Computer-aided detection (CAD) utilized.

COMPARISON: [Previous mammogram, ultrasound, MRI if available]

FINDINGS:

BACKGROUND PARENCHYMAL ENHANCEMENT (BPE):
- [Minimal/Mild/Moderate/Marked].
- [Symmetric/Asymmetric].

FIBROGLANDULAR TISSUE (FGT):
- [Almost entirely fatty / Scattered / Heterogeneous / Extremely dense].

MASS LESIONS:

LESION 1:
- Location: [Right/Left breast, clock face, distance from nipple].
- Size: [X] x [X] x [X] mm.
- Shape: [Oval/Round/Irregular].
- Margins: [Smooth/Irregular/Spiculated].
- Internal enhancement: [Homogeneous/Heterogeneous/Rim-enhancing/Dark internal septations].
- Kinetic curve:
  * Initial phase: [Slow/Medium/Rapid].
  * Delayed phase: [Persistent/Plateau/Washout].
- Non-mass enhancement: [Describe if applicable].
- Associated findings: [Nipple retraction, skin thickening, etc.].

LESION 2:
- [Similar description].

NON-MASS ENHANCEMENT:
- [None/Describe distribution and internal pattern].

AXILLA:
- Lymph nodes: [Normal/Morphologically suspicious].
- Size: [Describe enlarged nodes].
- Cortex: [Thin/Thickened].
- Enhancement: [Describe].

CHEst wall:
- Pectoralis muscles: [Normal/Involvement].
- Chest wall: [Normal/Involvement].

IMPLANTS (if present):
- Type: [Saline/Silicone/Dual-lumen].
- Integrity: [Intact/Ruptured].
- Intracapsular rupture: [Linguine sign].
- Extracapsular rupture: [Silicone outside capsule].
- Capsular contracture: [None/Mild/Moderate/Severe].

ADDITIONAL FINDINGS:
- Skin changes: [None/Describe].
- Nipple: [Normal/Abnormal].
- Ductal changes: [None/Describe].

BI-RADS MRI ASSESSMENT:
- Category 1: Negative.
- Category 2: Benign.
- Category 3: Probably benign - short-interval follow-up.
- Category 4: Suspicious - biopsy should be considered.
- Category 5: Highly suggestive of malignancy.
- Category 6: Known biopsy-proven malignancy.

IMPRESSION:
1. [RIGHT/LEFT BREAST]: [Finding]. BI-RADS [Category].
2. [RIGHT/LEFT BREAST]: [Finding]. BI-RADS [Category].
3. [Extension to chest wall/axilla if applicable].
4. [Recommendations].

RECOMMENDATIONS:
[Biopsy if suspicious / Short-term follow-up if probably benign / Routine annual screening if negative].`,
    categoryName: 'MRI',
    bodyPartName: 'Breast',
    modality: 'MRI',
    tags: 'mri,breast,BI-RADS,screening,kinetics,enhancement',
  },
  {
    title: 'MRI Hip - Labral Tear',
    description: 'MRI hip for labral tear and FAI evaluation',
    content: `MRI HIP - LABRAL TEAR EVALUATION

EXAMINATION: MRI of the [right/left] hip [with intra-articular contrast if MR arthrogram].

CLINICAL INDICATION: [Indication - hip pain, clicking, suspected labral tear, FAI]

TECHNIQUE: Multiplanar multisequence MRI of the hip including:
- Coronal T1, T2 fat-sat
- Sagittal T1, T2 fat-sat
- Axial T1, T2 fat-sat
- [MR arthrogram if performed: intra-articular gadolinium]

COMPARISON: [Previous imaging if available]

FINDINGS:

ACETABULAR LABRUM:
- [Normal/Tear].
- Tear location: [Anterior/Anterosuperior/Superior/Posterosuperior].
- Tear type: [Partial-thickness/Full-thickness/Complex].
- Labral degeneration: [Present/Absent].
- Paralabral cyst: [Present/Absent].
- Labral size: [Normal/Attenuated/Hypertrophic].

ACETABULUM:
- Coverage: [Normal/Dysplastic - lateral center-edge angle X°].
- Acetabular version: [Normal/Retroverted].
- Cartilage: [Intact/Chondral defect - Outerbridge grade, location].
- Os acetabuli: [Present/Absent].

FEMORAL HEAD:
- Shape: [Spherical/Aspherical].
- Alpha angle: [X]° (abnormal if >55° on radial images).
- Cam deformity: [Present/Absent].
- Cartilage: [Intact/Describe defects].
- Bone marrow: [Normal/Edema/Cystic change].
- AVN: [None/Stage X].

FEMORAL NECK:
- Morphology: [Normal/Cam/Valgus/Varus].
- Herniation pits: [Present/Absent].

JOINT SPACE:
- Effusion: [None/Small/Moderate/Large].
- Loose bodies: [None/Describe].
- Synovitis: [None/Present].

LIGAMENTUM TERES:
- [Normal/Thickened/Torn].

ILIOPSOAS TENDON:
- [Normal/Tendinosis/Snapping].

GLUTEAL TENDONS:
- Gluteus medius: [Normal/Tendinosis/Tear].
- Gluteus minimus: [Normal/Tendinosis/Tear].
- Trochanteric bursa: [Normal/Bursitis].

MUSCLES:
- [Normal/Atrophy/Strain].

FEMOROACETABULAR IMPINGEMENT (FAI):
- Cam-type: [Present/Absent] - alpha angle, femoral head-neck offset.
- Pincer-type: [Present/Absent] - acetabular overcoverage, retroversion.

IMPRESSION:
1. LABRAL STATUS: [Normal/Partial tear/Full-thickness tear at ___].
2. CARTILAGE: [Intact/Chondral defect at ___].
3. FAI TYPE: [None/Cam/Pincer/Mixed].
4. [Other findings].
5. [Recommendations].

RECOMMENDATIONS:
[Orthopedic referral / Hip preservation surgery consideration / Physical therapy].`,
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'mri,hip,labral tear,FAI,cam,pincer,arthrogram',
  },

  // ========== ADDITIONAL ULTRASOUND TEMPLATES ==========
  {
    title: 'USG Appendix - Pediatric',
    description: 'Pediatric appendiceal ultrasound',
    content: `ULTRASOUND APPENDIX - PEDIATRIC

EXAMINATION: Graded compression ultrasound of the right lower quadrant.

CLINICAL INDICATION: [Indication - suspected appendicitis, RLQ pain]

TECHNIQUE: Graded compression ultrasound of the right lower quadrant using a high-frequency linear transducer. Color Doppler evaluation performed.

COMPARISON: [Previous imaging if available]

FINDINGS:

APPENDIX:
- Visualized: [Yes/No].
- Location: [Typical/Retrocecal/Pelvic].
- Outer diameter: [X] mm (abnormal if >6 mm).
- Wall thickness: [X] mm.
- Compressibility: [Completely compressible/Non-compressbile].
- Wall layers: [Preserved/Lost].
- Appendicolith: [Present/Absent]. Size: [X] mm.

SIGNS OF APPENDICITIS:
- Appendiceal dilation: [Present/Absent].
- Non-compressibility: [Present/Absent].
- Wall hyperemia on color Doppler: [Present/Absent].
- Periappendiceal fat stranding: [Present/Absent].
- Periappendiceal fluid: [Present/Absent].

COMPLICATIONS:
- Perforation: [No evidence/Suspected].
  * Periappendiceal abscess: [Absent/Present]. Size: [X] cm.
  * Free fluid: [None/Small/Moderate].
- Appendiceal mass: [Absent/Present].

CECUM AND TERMINAL ILEUM:
- Terminal ileum: [Normal/Thickened/Inflamed].
- Cecal wall: [Normal/Thickened].

OTHER FINDINGS:
- Bowel: [Normal/Dilated].
- Other bowel pathology: [Intussusception/Mesenteric adenitis/Other].
- Liver: [Normal].
- Kidneys: [Normal].
- Bladder: [Normal].
- Pelvis (female): [Ovarian pathology].

IMPRESSION:
1. APPENDICITIS: [Positive/Negative/Equivocal].
   - Appendix diameter: [X] mm.
   - [With/Without] inflammatory changes.
   - [With/Without] complications.
2. [Alternative diagnosis if appendicitis negative].
3. [Recommendations].

RECOMMENDATIONS:
[Surgery consultation / CT if ultrasound equivocal / Clinical observation].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'USG',
    tags: 'usg,appendix,pediatric,appendicitis,RLQ,pain',
  },
  {
    title: 'USG Echocardiogram - Adult',
    description: 'Transthoracic echocardiogram for cardiac evaluation',
    content: `TRANSTHORACIC ECHOCARDIOGRAM

EXAMINATION: Transthoracic echocardiogram.

CLINICAL INDICATION: [Indication - dyspnea, murmur, chest pain]

TECHNIQUE: Comprehensive 2D, M-mode, and Doppler echocardiography performed. Standard views include parasternal long and short axis, apical 4-chamber, 2-chamber, and subcostal views.

COMPARISON: [Previous echocardiogram if available]

FINDINGS:

LEFT VENTRICLE:
- Chamber size: [Normal/Mildly/Moderately/Severely dilated].
- LVEDD: [X] mm (normal 42-58 mm).
- LVESD: [X] mm (normal 25-40 mm).
- Wall thickness: IVS [X] mm, PW [X] mm (normal 6-11 mm).
- LV mass index: [X] g/m².
- Systolic function:
  * LVEF by biplane Simpson: [X]%.
  * Visual EF: [X]%.
  * [Normal/Reduced] global LV systolic function.
  * Regional wall motion: [Normal/Abnormal - describe segments].
- Diastolic function:
  * E/A ratio: [X].
  * E/e' ratio: [X].
  * Diastolic grade: [I/II/III].

RIGHT VENTRICLE:
- Size: [Normal/Mildly/Moderately/Severely dilated].
- Systolic function: [Normal/Reduced].
- TAPSE: [X] mm (normal >17 mm).
- RV FAC: [X]%.

LEFT ATRIUM:
- Size: [Normal/Enlarged].
- LA volume index: [X] mL/m².
- Spontaneous echo contrast: [Absent/Present].

RIGHT ATRIUM:
- Size: [Normal/Enlarged].

AORTIC VALVE:
- Morphology: [Tricuspid/Bicuspid/Other].
- Valve area: [X] cm².
- Mean gradient: [X] mmHg.
- Peak velocity: [X] m/s.
- Vena contracta: [X] mm.
- Aortic regurgitation: [None/Trace/Mild/Moderate/Severe].

MITRAL VALVE:
- Morphology: [Normal/Myxomatous/Calcified].
- Mitral stenosis: [Absent/Present]. Mean gradient: [X] mmHg.
- Mitral regurgitation: [None/Trace/Mild/Moderate/Severe].
  * Mechanism: [Primary/Secondary].

TRICUSPID VALVE:
- Tricuspid regurgitation: [None/Trace/Mild/Moderate/Severe].
- TR velocity: [X] m/s.
- Estimated RVSP: [X] mmHg.

PULMONIC VALVE:
- Pulmonic regurgitation: [None/Trace/Mild/Moderate].

PULMONARY PRESSURES:
- PASP estimate: [X] mmHg.
- [Normal/Mild/Moderate/Severe pulmonary hypertension].

PERICARDIUM:
- Pericardial effusion: [None/Small/Moderate/Large].
- Tamponade physiology: [Absent/Present].

AORTA:
- Ascending aorta: [X] mm.
- Sinus of Valsalva: [X] mm.

INFERIOR VENA CAVA:
- Diameter: [X] mm.
- Collapse with respiration: [Normal/Reduced].
- RA pressure estimate: [X] mmHg.

IMPRESSION:
1. LV SYSTOLIC FUNCTION: [Normal/Reduced]. LVEF [X]%.
2. LV DIASTOLIC FUNCTION: [Normal/Grade I/II/III].
3. VALVULAR DISEASE: [Describe].
4. CHAMBER SIZES: [Normal/Describe].
5. PULMONARY PRESSURES: [Normal/Elevated].
6. PERICARDIUM: [Normal/Effusion].
7. [Comparison to prior if available].

RECOMMENDATIONS:
[Follow-up echo / Cardiology referral / Additional testing].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Cardiac',
    modality: 'USG',
    tags: 'usg,echocardiogram,echo,cardiac,LVEF,valve,heart',
  },
  {
    title: 'USG Neonatal Hip - DDH Screening',
    description: 'Ultrasound screening for developmental dysplasia of hip',
    content: `ULTRASOUND NEONATAL HIP - DDH SCREENING

EXAMINATION: Ultrasound of the [right/left/bilateral] hip(s).

CLINICAL INDICATION: [Indication - DDH screening, click, positive family history]

TECHNIQUE: Graf technique performed using high-frequency linear transducer. Standard coronal view at the level of the acetabulum.

COMPARISON: [Previous imaging if available]

FINDINGS:

RIGHT HIP:
- Acetabular morphology:
  * Bony roof: [Well-developed/Deficient].
  * Ossified roof: [Normal/Deficient].
  * Cartilaginous roof: [Normal/Covering femoral head/Displaced].
- Femoral head position:
  * Coverage: [Normal/Reduced].
  * Position: [Located/Subluxed/Dislocated].
- Graf measurements:
  * Alpha angle: [X]° (bony roof angle, normal ≥60°).
  * Beta angle: [X]° (cartilaginous roof angle, normal <55°).
- Graf type: [Type].
  * Type I: Mature hip (α ≥60°, β <55°).
  * Type IIa: Physiologic immaturity <3 months (α 50-59°, β 55-77°).
  * Type IIb: Delayed ossification >3 months.
  * Type IIc: Critical hip (α 43-49°, β <77°).
  * Type D: Decentered hip (α 43-49°, β >77°).
  * Type III: Subluxed (α <43°).
  * Type IV: Dislocated.
- Stability on stress: [Stable/Unstable].

LEFT HIP:
- [Same measurements and classification].

COMPARISON:
- [Symmetric/Asymmetric findings].

ASSOCIATED FINDINGS:
- [Other relevant findings].

IMPRESSION:
1. RIGHT HIP: Graf Type [X]. [Stable/Unstable].
2. LEFT HIP: Graf Type [X]. [Stable/Unstable].
3. [Treatment recommendations].

RECOMMENDATIONS:
- Type I: Normal, no treatment.
- Type IIa (<3 months): Observation, repeat ultrasound in 4-6 weeks.
- Type IIb/D/III/IV: Orthopedic referral, Pavlik harness or surgical consideration.
- [Follow-up ultrasound if indicated].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Lower Extremity',
    modality: 'USG',
    tags: 'usg,hip,neonatal,DDH,Graf,pediatric,screening',
  },
  {
    title: 'USG Testicular - Scrotal Pain',
    description: 'Testicular ultrasound for acute scrotal pain',
    content: `ULTRASOUND TESTICULAR - ACUTE SCROTAL PAIN

EXAMINATION: Ultrasound of the scrotum.

CLINICAL INDICATION: [Indication - acute scrotal pain, swelling, suspected torsion]

TECHNIQUE: High-frequency linear transducer evaluation of both testes and epididymides with grayscale and color Doppler.

COMPARISON: [Previous imaging if available]

FINDINGS:

RIGHT TESTIS:
- Size: [X] x [X] x [X] cm. Volume: [X] mL.
- Parenchyma: [Homogeneous/Heterogeneous].
- Echotexture: [Normal/Focal abnormality].
- Color Doppler flow: [Normal/Increased/Absent].
- Focal lesions: [None/Describe].
- Hydrocele: [None/Small/Moderate/Large].

LEFT TESTIS:
- Size: [X] x [X] x [X] cm. Volume: [X] mL.
- Parenchyma: [Homogeneous/Heterogeneous].
- Color Doppler flow: [Normal/Increased/Absent].
- [Describe any abnormalities].

EPIDIDYMIDES:
- Right epididymis:
  * Head: [Normal/Enlarged].
  * Body: [Normal/Thickened].
  * Tail: [Normal/Abnormal].
  * Color flow: [Normal/Increased].
- Left epididymis: [Same assessment].

SPERMATIC CORD:
- Right: [Normal/Thickened/Twisted].
- Left: [Normal/Thickened/Twisted].
- Blood flow: [Normal/Abnormal].

TESTICULAR TORSION ASSESSMENT:
- [No evidence of torsion / Torsion suspected].
- Blood flow: [Present symmetrically / Absent on affected side].
- "Whirlpool sign": [Present/Absent].
- Testicular size: [Normal/Enlarged].
- Parenchymal heterogeneity: [Absent/Present - suggests infarction].

EPIDIDYMO-ORCHITIS:
- [No evidence / Present].
- Affected side: [Right/Left/Bilateral].
- Epididymal enlargement: [Present].
- Increased blood flow: [Present].
- Reactive hydrocele: [Present/Absent].

OTHER FINDINGS:
- Varicocele: [Absent/Right/Left/Bilateral].
- Inguinal region: [Normal/Hernia].
- Skin: [Normal/Thickened].

IMPRESSION:
1. [No evidence of testicular torsion / Concern for torsion].
2. [Epididymitis/Orchitis if present].
3. [Other findings].
4. [Recommendations].

URGENT FINDINGS:
- If torsion suspected: IMMEDIATE urology consultation required.

RECOMMENDATIONS:
[Urology consultation if torsion / Antibiotics if epididymitis / Clinical correlation].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'MSK General',
    modality: 'USG',
    tags: 'usg,scrotum,testis,torsion,epididymitis,acute,pain',
  },

  // ========== ADDITIONAL X-RAY TEMPLATES ==========
  {
    title: 'X-Ray Abdomen - Acute Abdomen',
    description: 'Abdominal X-ray for acute abdomen evaluation',
    content: `X-RAY ABDOMEN - ACUTE ABDOMEN

EXAMINATION: [Supine/Upright/Decubitus] view(s) of the abdomen.

CLINICAL INDICATION: [Indication - abdominal pain, vomiting, distension]

TECHNIQUE: [Views obtained: Supine, upright, left lateral decubitus].

COMPARISON: [Previous imaging if available]

FINDINGS:

BOWEL GAS PATTERN:
- Stomach: [Normal/Dilated].
- Small bowel: [Normal/Dilated].
  * Diameter: [X] cm (normal <3 cm).
  * Valvulae conniventes: [Visible/Not visible].
  * Distribution: [Central/Generalized].
- Large bowel: [Normal/Dilated].
  * Diameter: [X] cm (normal <6 cm, cecum <9 cm).
  * Haustra: [Visible/Not visible].
  * Distribution: [Peripheral/Generalized].

BOWEL OBSTRUCTION:
- [No evidence of obstruction].
- [Partial/Complete small bowel obstruction]:
  * Dilated small bowel proximal to [location].
  * Air-fluid levels: [Present/Absent].
  * Transition point: [Not identified/At ___].
- [Large bowel obstruction]:
  * Dilated colon proximal to [location].
  * Cecal diameter: [X] mm (concerning if >9-12 cm).

PNEUMOPERITONEUM:
- [No free intraperitoneal air].
- [Free air present]:
  * Location: [Under right hemidiaphragm/Under left hemidiaphragm/Rigler sign].
  * Quantity: [Small/Moderate/Large].

CALCIFICATIONS:
- [None identified].
- [Present]:
  * Location: [Gallbladder/Kidney/Ureter/Appendicolith/Vascular/Other].
  * Size: [X] mm.

ORGAN SILHOUETTES:
- Liver: [Normal size/Enlarged].
- Spleen: [Normal size/Enlarged].
- Kidneys: [Visible outlines/Not visible].
- Psoas shadows: [Visible bilaterally/Obscured].

SOFT TISSUES:
- [Normal/Abnormal].
- Flank stripes: [Preserved/Lost].

DIAPHRAGM:
- [Normal position].
- [Elevated: Right/Left/Bilateral].

TUBES AND LINES:
- [None present/Describe position].

BONES:
- Visible bones: [Unremarkable/Abnormal].
- Compression fractures: [None/Describe].

IMPRESSION:
1. [No acute abnormality / Findings].
2. [Obstruction: None/Partial/Complete, level].
3. [Pneumoperitoneum: Present/Absent].
4. [Calcifications].
5. [Recommendations].

RECOMMENDATIONS:
[CT abdomen/pelvis if needed / Clinical correlation / Surgical consultation if obstruction/perforation].`,
    categoryName: 'X-Ray',
    bodyPartName: 'Abdomen',
    modality: 'X-Ray',
    tags: 'xray,abdomen,obstruction,pneumoperitoneum,acute abdomen',
  },
  {
    title: 'X-Ray Pelvis - Hip',
    description: 'Pelvis and hip radiograph evaluation',
    content: `X-RAY PELVIS AND HIPS

EXAMINATION: Radiograph of the pelvis.

CLINICAL INDICATION: [Indication - hip pain, trauma, arthritis]

TECHNIQUE: Anteroposterior view of the pelvis. [Additional views: Frog-leg lateral].

COMPARISON: [Previous imaging if available]

FINDINGS:

HIP JOINTS:
- Right hip:
  * Joint space: [Preserved/Narrowed]. Width: [X] mm.
  * Acetabulum: [Normal/Dysplastic].
  * Femoral head: [Normal/Flattened/Subluxed].
  * Shenton's line: [Intact/Disrupted].
  * Center-edge angle: [Normal/Decreased].
- Left hip:
  * [Same assessment].

SACROILIAC JOINTS:
- [Normal/Sacroiliitis/Ankylosis].
- Symmetry: [Symmetric/Asymmetric].

PUBIC SYMPHYSIS:
- [Normal/Widened/Sclerotic].

SACRUM AND COCCYX:
- [Normal/Fracture].
- [Describe any abnormalities].

FEMORAL HEADS AND NECKS:
- Shape: [Normal/Abnormal].
- Neck-shaft angle: [Normal/Varus/Valgus].
- Greater trochanters: [Normal/Abnormal].
- Lesser trochanters: [Normal/Abnormal].

ARTICULAR SURFACES:
- Sclerotic changes: [None/Present].
- Osteophytes: [None/Present].
- Subchondral cysts: [None/Present].
- Erosions: [None/Present].

SOFT TISSUES:
- [Normal/Swelling/Calcifications].

HIP ARTHRITIS GRADING (Tonnis):
- Grade 0: Normal.
- Grade 1: Minimal changes, joint space >2.5 mm.
- Grade 2: Moderate changes, joint space 2.5-1.5 mm.
- Grade 3: Severe changes, joint space <1.5 mm.

BONES:
- [Describe any lesions or fractures].
- Bone density: [Normal/Osteopenic].

IMPRESSION:
1. [No acute fracture or dislocation].
2. [Degenerative changes: None/Mild/Moderate/Severe at ___].
3. [Hip dysplasia if present].
4. [Other findings].
5. [Recommendations].

RECOMMENDATIONS:
[Clinical correlation / MRI if AVN suspected / Orthopedic referral if arthritis severe].`,
    categoryName: 'X-Ray',
    bodyPartName: 'Pelvis',
    modality: 'X-Ray',
    tags: 'xray,pelvis,hip,arthritis,dysplasia,OA',
  },
  {
    title: 'X-Ray Knee - OA Evaluation',
    description: 'Knee radiograph for osteoarthritis assessment',
    content: `X-RAY KNEE - OSTEOARTHRITIS EVALUATION

EXAMINATION: Radiographs of the [right/left/bilateral] knee(s).

CLINICAL INDICATION: [Indication - knee pain, osteoarthritis assessment]

TECHNIQUE: [Views: AP, lateral, sunrise/skyline, weight-bearing if applicable].

COMPARISON: [Previous imaging if available]

FINDINGS:

JOINT SPACES:
- Medial compartment: [Preserved/Narrowed].
  * Joint space width: [X] mm.
- Lateral compartment: [Preserved/Narrowed].
  * Joint space width: [X] mm.
- Patellofemoral compartment: [Preserved/Narrowed].
- [Asymmetric narrowing: Medial/Lateral predominant].

OSSEOUS CHANGES:
- Osteophytes:
  * Femoral condyles: [None/Small/Moderate/Large].
  * Tibial plateaus: [None/Small/Moderate/Large].
  * Patella: [None/Present].
- Subchondral sclerosis: [None/Mild/Moderate/Severe].
- Subchondral cysts: [None/Present].
- Bone marrow lesions: [Not assessable on X-ray].

ALIGNMENT:
- Mechanical axis: [Normal/Varus/Valgus].
- [Malalignment: Describe degree].

PATELLA:
- Position: [Normal/Alta/Baja].
- Facets: [Normal/Sclerotic].
- [Patellofemoral arthritis if present].

SOFT TISSUES:
- Effusion: [None/Small/Moderate/Large].
- Soft tissue swelling: [None/Present].
- Calcifications: [None/Present - location].

FRACTURES:
- [No acute fracture].
- [Old fracture: Describe].

KELLGREN-LAWRENCE GRADING:
- Grade 0: No radiographic features of OA.
- Grade 1: Doubtful joint space narrowing, possible osteophyte lipping.
- Grade 2: Possible joint space narrowing, definite osteophytes.
- Grade 3: Definite joint space narrowing, moderate osteophytes, subchondral sclerosis.
- Grade 4: Marked joint space narrowing, large osteophytes, severe sclerosis, bone deformation.

IMPRESSION:
1. OSTEOARTHRITIS: [None/Grade I/II/III/IV].
   - Compartment involvement: [Medial/Lateral/Patellofemoral/Tricompartmental].
2. ALIGNMENT: [Normal/Varus/Valgus].
3. EFFUSION: [Present/Absent].
4. [Comparison to prior if available].
5. [Recommendations].

RECOMMENDATIONS:
[Conservative management / Weight loss if indicated / Physical therapy / Orthopedic referral if severe].`,
    categoryName: 'X-Ray',
    bodyPartName: 'Lower Extremity',
    modality: 'X-Ray',
    tags: 'xray,knee,osteoarthritis,OA,Kellgren-Lawrence',
  },

  // ========== INTERVENTIONAL RADIOLOGY ==========
  {
    title: 'IR - CT-Guided Biopsy',
    description: 'CT-guided needle biopsy procedure report',
    content: `CT-GUIDED NEEDLE BIOPSY

PROCEDURE: CT-guided needle biopsy of [lesion location].

CLINICAL INDICATION: [Indication - tissue diagnosis needed].

PRE-PROCEDURE:
- Informed consent obtained.
- Coagulation studies reviewed: [INR, platelets].
- Pre-procedure imaging reviewed.

PROCEDURE DETAILS:
- Patient position: [Supine/Prone/Decubitus].
- Localization: CT performed to localize target lesion.
- Anesthesia: Local lidocaine [X] mL [with/without] moderate sedation.
- Approach: [Describe approach - trajectory].
- Needle: [X] gauge [coaxial/biopsy] needle.
- Samples: [X] core biopsies obtained.
- Specimen handling: Sent to pathology for [histology/microbiology/other].
- [FNA performed: X passes for cytology].
- Hemostasis: Manual compression for [X] minutes.

TARGET LESION:
- Location: [___].
- Size: [X] x [X] cm.
- Depth from skin: [X] cm.
- Needle path: [Describe].

COMPLICATIONS:
- Immediate: [None/Describe].
- Post-procedure CT: [No hematoma/No pneumothorax/etc].

POST-PROCEDURE:
- Patient observed for [X] minutes.
- Vital signs stable.
- Discharge instructions given.
- [Chest X-ray if thoracic procedure].

IMPRESSION:
1. CT-guided biopsy of [lesion] successfully performed.
2. [Number] samples sent to pathology.
3. [Immediate complications: None/Describe].
4. [Follow-up instructions].

RECOMMENDATIONS:
[Pathology follow-up / Post-procedure care instructions / Return precautions].`,
    categoryName: 'Interventional',
    bodyPartName: 'Whole Body',
    modality: 'Interventional',
    tags: 'biopsy,CT-guided,interventional,procedure',
  },
  {
    title: 'IR - Thoracentesis',
    description: 'Image-guided thoracentesis procedure report',
    content: `IMAGE-GUIDED THORACENTESIS

PROCEDURE: [Ultrasound/CT]-guided thoracentesis [right/left].

CLINICAL INDICATION: [Indication - pleural effusion, therapeutic/diagnostic].

PRE-PROCEDURE:
- Informed consent obtained.
- Coagulation studies reviewed: [INR, platelets].
- Pre-procedure imaging reviewed.
- Procedure discussed with patient.

PROCEDURE DETAILS:
- Patient position: [Upright/Supine/Decubitus].
- Ultrasound localization performed.
- Effusion characteristics:
  * Volume estimate: [X] mL.
  * Echogenicity: [Anechoic/Complex/Septated].
  * Location: [Costophrenic angle/Loculated].
- Anesthesia: Local lidocaine [X] mL.
- Approach: [Intercostal space, posterior axillary line, etc.].
- Needle/catheter: [X] gauge [X] cm needle/catheter.
- Fluid removed: [X] mL.
- Fluid appearance: [Serous/Serosanguinous/Turbid/Purulent/Bloody].
- Specimens sent: [Cell count, culture, cytology, chemistry].

COMPLICATIONS:
- Immediate: [None/Pneumothorax/Cough/Hypotension].
- Post-procedure imaging: [Chest X-ray obtained].
  * Residual effusion: [Present/Absent].
  * Pneumothorax: [None/Small/Moderate/Large].

POST-PROCEDURE:
- Patient tolerated procedure well.
- Vital signs stable.
- [Chest X-ray obtained: Findings].
- Discharge instructions given.

IMPRESSION:
1. [Right/Left] thoracentesis successfully performed.
2. [X] mL of [fluid type] fluid removed.
3. Specimens sent for analysis.
4. [Complications: None/Describe].
5. [Follow-up recommendations].

RECOMMENDATIONS:
[Follow pleural fluid results / Clinical follow-up / Repeat thoracentesis if needed].`,
    categoryName: 'Interventional',
    bodyPartName: 'Chest/Thorax',
    modality: 'Interventional',
    tags: 'thoracentesis,pleural effusion,interventional,procedure',
  },

  // ========== FLUOROSCOPY ==========
  {
    title: 'Fluoroscopy - Upper GI Series',
    description: 'Barium upper GI series examination',
    content: `UPPER GASTROINTESTINAL SERIES

EXAMINATION: Upper GI series with barium.

CLINICAL INDICATION: [Indication - dysphagia, reflux, abdominal pain]

TECHNIQUE: Patient ingested barium sulfate suspension. Fluoroscopic evaluation performed in multiple positions. Spot images obtained.

COMPARISON: [Previous imaging if available]

FINDINGS:

ESOPHAGUS:
- Caliber: [Normal/Dilated/Strictured].
- Peristalsis: [Normal/Diminished/Disordered].
- Mucosal pattern: [Normal/Abnormal].
- Hiatal hernia: [None/Sliding/Paraesophageal].
- Gastroesophageal reflux: [None/Mild/Moderate/Severe].
- [Stricture: location, length, diameter].
- [Mass lesion: describe].
- [Achalasia: bird's beak appearance, dilated esophagus].
- [Esophagitis: mucosal irregularity].

STOMACH:
- Size and shape: [Normal/Abnormal].
- Distensibility: [Normal/Reduced].
- Peristalsis: [Normal/Diminished].
- Gastric folds: [Normal/Thickened].
- Ulcer: [None/Present - location, size].
- Mass: [None/Present - location, size].
- [Linitis plastica: leather bottle appearance].
- Pylorus: [Patent/Stenotic].

DUODENUM:
- Bulb: [Normal/Deformed/Ulcer scar].
- Loop: [Normal/Dilated].
- Mucosal pattern: [Normal/Abnormal].
- [Duodenal ulcer: describe].
- [Post-surgical changes: describe].

TRANSIT TIME:
- [Normal/Delayed].

OTHER FINDINGS:
- [Extraluminal findings].

IMPRESSION:
1. [Normal upper GI series].
2. [Abnormal findings]:
   - [Hiatal hernia: type].
   - [GERD: severity].
   - [Ulcer: location].
   - [Mass/stricture: describe].
3. [Recommendations].

RECOMMENDATIONS:
[Endoscopy if indicated / Clinical correlation / Follow-up imaging].`,
    categoryName: 'Fluoroscopy',
    bodyPartName: 'Abdomen',
    modality: 'Fluoroscopy',
    tags: 'fluoroscopy,upper GI,barium,esophagus,stomach,GERD',
  },
  {
    title: 'Fluoroscopy - Barium Enema',
    description: 'Barium enema examination of colon',
    content: `BARIUM ENEMA

EXAMINATION: [Single-contrast/Double-contrast] barium enema.

CLINICAL INDICATION: [Indication - altered bowel habits, screening, polyps]

TECHNIQUE: After bowel preparation, barium [and air] was introduced per rectum. Fluoroscopic evaluation performed with spot images and overhead radiographs.

COMPARISON: [Previous imaging if available]

FINDINGS:

COLON BY SEGMENT:

CECUM:
- [Normal/Abnormal].
- Filling: [Complete/Incomplete].
- Lesions: [None/Describe].

ASCENDING COLON:
- [Normal/Abnormal].
- [Polyps/masses/strictures].

HEPATIC FLEXURE:
- [Normal/Abnormal].

TRANSVERSE COLON:
- [Normal/Abnormal].
- Length: [Normal/Redundant].

SPLENIC FLEXURE:
- [Normal/Abnormal].

DESCENDING COLON:
- [Normal/Abnormal].
- [Diverticula: present, severity].

SIGMOID COLON:
- [Normal/Abnormal].
- Length: [Normal/Redundant/Tortuous].
- Diverticulosis: [None/Mild/Moderate/Severe].

RECTUM:
- [Normal/Abnormal].

OVERALL ASSESSMENT:
- Colonic caliber: [Normal/Dilated/Narrowed].
- Haustral pattern: [Normal/Effaced].
- Motility: [Normal/Abnormal].
- Ileocecal valve: [Normal/Abnormal].

LESIONS:
- Polyps: [None/Present].
  * Location: [___].
  * Size: [X] mm.
  * Morphology: [Sessile/Pedunculated].
- Masses: [None/Present].
  * Location, size, morphology.
- Strictures: [None/Present].
  * Location, length, cause.

DIVERTICULOSIS:
- [None/Present].
- Distribution: [Sigmoid/Left colon/Pancolonic].
- Severity: [Mild/Moderate/Severe].

OTHER FINDINGS:
- Extrinsic impressions: [None/Describe].
- Hernias: [None/Describe].

IMPRESSION:
1. [Normal barium enema].
2. [Abnormal findings]:
   - Polyps: [Number, location, sizes].
   - Mass: [Location, characteristics].
   - Diverticulosis: [Distribution, severity].
   - Stricture: [Location, cause].
3. [Recommendations].

RECOMMENDATIONS:
[Colonoscopy if polyps/masses / Clinical correlation / Follow-up].`,
    categoryName: 'Fluoroscopy',
    bodyPartName: 'Abdomen',
    modality: 'Fluoroscopy',
    tags: 'fluoroscopy,barium enema,colon,polyps,diverticulosis',
  },
  {
    title: 'Fluoroscopy - HSG (Hysterosalpingogram)',
    description: 'Hysterosalpingogram for tubal patency evaluation',
    content: `HYSTEROSALPINGOGRAM

EXAMINATION: Hysterosalpingogram.

CLINICAL INDICATION: [Indication - infertility, tubal evaluation]

TECHNIQUE: Under fluoroscopic guidance, a catheter was inserted through the cervical canal. Water-soluble contrast medium was injected. Images obtained during filling.

COMPARISON: [Previous imaging if available]

FINDINGS:

UTERUS:
- Cervical canal: [Normal/Stenotic].
- Uterine cavity:
  * Size: [Normal/Small/Large].
  * Shape: [Normal/Abnormal].
  * Contour: [Smooth/Irregular].
  * Filling defects: [None/Present].
- Uterine anomalies:
  * [Normal triangular configuration].
  * [Septate: two horns, single cervix].
  * [Bicornuate: two horns, two cervices].
  * [Arcuate: slight indentation].
  * [Unicornuate].
- [Asherman syndrome: intrauterine adhesions].
- [Leiomyoma: filling defect].
- [Polyps: filling defect].

FALLOPIAN TUBES:

RIGHT FALLOPIAN TUBE:
- Proximal portion: [Normal/Blocked/Occluded].
- Ampulla: [Normal/Dilated].
- Contrast spill: [Free into peritoneal cavity/None/Limited].
- Hydrosalpinx: [Absent/Present - size X mm].
- Loculation: [None/Present].

LEFT FALLOPIAN TUBE:
- Proximal portion: [Normal/Blocked/Occluded].
- Ampulla: [Normal/Dilated].
- Contrast spill: [Free/None/Limited].
- Hydrosalpinx: [Absent/Present].
- Loculation: [None/Present].

PERITONEAL SPILL:
- Right: [Free/None].
- Left: [Free/None].

COMPLICATIONS:
- [None/Describe - pain, bleeding, contrast reaction].

IMPRESSION:
1. UTERUS: [Normal/Describe anomaly].
2. RIGHT TUBE: [Patent/Occluded - proximal/distal].
3. LEFT TUBE: [Patent/Occluded - proximal/distal].
4. [Bilateral tubal patency].
5. [Recommendations].

RECOMMENDATIONS:
[Fertility specialist follow-up / Consider laparoscopy if tubal disease / Repeat if technical difficulty].`,
    categoryName: 'Fluoroscopy',
    bodyPartName: 'Pelvis',
    modality: 'Fluoroscopy',
    tags: 'fluoroscopy,HSG,hysterosalpingogram,infertility,tubal patency',
  },

  // ========== NUCLEAR MEDICINE ADDITIONAL ==========
  {
    title: 'Nuclear Medicine - HIDA Scan',
    description: 'Hepatobiliary scintigraphy for acute cholecystitis',
    content: `HEPATOBILIARY SCINTIGRAPHY (HIDA SCAN)

EXAMINATION: Hepatobiliary scintigraphy.

CLINICAL INDICATION: [Indication - suspected acute cholecystitis, biliary leak, biliary atresia]

TECHNIQUE: Patient received [X] mCi Tc-99m mebrofenin intravenously after fasting for at least 4 hours. Dynamic images acquired for 60 minutes. [Sincalide administered / Morphine augmentation if needed]. Delayed images obtained at [time].

COMPARISON: [Previous imaging if available]

FINDINGS:

LIVER:
- Uptake: [Normal/Rapid/Poor].
- Hepatic excretion: [Normal/Delayed].

GALLBLADDER:
- Visualization: [Yes at X minutes / No].
- Normal visualization: Within 30-60 minutes.
- [Non-visualization suggests acute cholecystitis].

BILIARY TREE:
- Common bile duct: [Visualized/Not visualized].
- Biliary-to-bowel transit: [Present/Absent].
- Time to bowel: [X] minutes (normal <60 minutes).

CYSTIC DUCT:
- [Patent/Occluded].

EJECTION FRACTION (if sincalide administered):
- Gallbladder ejection fraction: [X]%.
- Normal: >35-40%.

MORPHINE AUGMENTATION (if performed):
- [Gallbladder visualized after morphine: excludes acute cholecystitis].
- [No gallbladder visualization: suggests acute cholecystitis].

BILIARY LEAK (if suspected):
- [No evidence of biliary leak].
- [Bile leak identified: location, extent].

INTERPRETATION CRITERIA:
- Acute cholecystitis: Non-visualization of gallbladder at 60 minutes (or 30 min after morphine).
- Chronic cholecystitis: Delayed gallbladder visualization (>60 min) or reduced EF.
- Cystic duct obstruction: Non-visualization of gallbladder.
- Biliary obstruction: No biliary-to-bowel transit.
- Biliary leak: Extrahepatic radiotracer accumulation.

IMPRESSION:
1. GALLBLADDER: [Visualized at X min / Not visualized].
2. BILIARY FLOW: [Normal/Abnormal].
3. CYSTIC DUCT: [Patent/Occluded].
4. [POSITIVE/NEGATIVE] for acute cholecystitis.
5. [Other findings].

RECOMMENDATIONS:
[Surgery consultation if acute cholecystitis / Clinical correlation / Additional imaging].`,
    categoryName: 'Nuclear Medicine',
    bodyPartName: 'Abdomen',
    modality: 'Nuclear Medicine',
    tags: 'HIDA,cholecystitis,gallbladder,nuclear medicine,biliary',
  },
  {
    title: 'Nuclear Medicine - V/Q Scan',
    description: 'Ventilation-perfusion scan for pulmonary embolism',
    content: `VENTILATION-PERFUSION (V/Q) SCAN

EXAMINATION: Ventilation-perfusion scintigraphy.

CLINICAL INDICATION: [Indication - suspected pulmonary embolism, renal failure, contrast allergy]

TECHNIQUE:
- Perfusion: [X] mCi Tc-99m MAA injected intravenously in supine position.
- Ventilation: [X] mCi Tc-99m DTPA aerosol [or Xenon-133] inhaled.
- Images: 6-view perfusion, matching ventilation views.

COMPARISON: [Previous imaging if available, recent chest X-ray]

FINDINGS:

CHEST X-RAY (required for interpretation):
- [Normal/Abnormal].
- [Describe any opacities, effusions].

PERFUSION:
- [Describe any perfusion defects].
- Location: [Segmental/Non-segmental].
- Size: [Small (<25% segment), Moderate (25-75%), Large (>75%)].

VENTILATION:
- [Describe ventilation pattern].
- Mismatch: [Present/Absent].

DEFECT ANALYSIS:

SEGMENTAL PERFUSION DEFECTS WITH NORMAL VENTILATION (MISMATCHES):
- [List all segments with mismatch].
- [Right upper lobe: segments].
- [Right middle lobe: segments].
- [Right lower lobe: segments].
- [Left upper lobe: segments].
- [Left lower lobe: segments].

MATCHED DEFECTS:
- [Describe].
- [Correlation with chest X-ray findings].

PROBABILITY ASSESSMENT (PIOPED II / Revised Criteria):

HIGH PROBABILITY:
- ≥2 large segmental mismatches.
- OR 1 large + 2 moderate mismatches.
- OR 4 moderate mismatches.

INTERMEDIATE PROBABILITY:
- 1 moderate-2 large mismatches with clear CXR.
- Solitary moderate mismatch.
- Other non-diagnostic patterns.

LOW PROBABILITY:
- Non-segmental defects.
- Matched defects with CXR abnormality.
- <2 segmental mismatches.

NORMAL:
- No perfusion defects.

IMPRESSION:
1. PROBABILITY FOR PULMONARY EMBOLISM: [High/Intermediate/Low/Normal].
2. [Number of segmental mismatches: X].
3. [Comparison to prior if available].
4. [Recommendations].

RECOMMENDATIONS:
[High: Clinical correlation, consider anticoagulation / Intermediate: CTPA or clinical assessment / Low: Consider alternative diagnosis / Normal: PE excluded].`,
    categoryName: 'Nuclear Medicine',
    bodyPartName: 'Chest/Thorax',
    modality: 'Nuclear Medicine',
    tags: 'V/Q scan,pulmonary embolism,PE,PIOPED,nuclear medicine',
  },
]

// Additional snippets
const additionalSnippets = [
  // Normal findings
  {
    title: 'Normal Findings - Unremarkable',
    description: 'Generic normal findings statement',
    content: 'No acute abnormality. Unremarkable appearance.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'normal,unremarkable,negative',
  },
  {
    title: 'Normal Cardiac Silhouette',
    description: 'Normal heart on imaging',
    content: 'Cardiac silhouette is within normal limits. No cardiomegaly.',
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'cardiac,heart,normal,cardiomegaly',
  },
  {
    title: 'No Mass Effect',
    description: 'No mass effect description',
    content: 'No mass effect. No midline shift. Ventricles and sulci are normal.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'mass effect,midline shift,normal',
  },
  // Comparison phrases
  {
    title: 'Interval Development',
    description: 'New finding since prior',
    content: 'This finding is new compared to prior examination dated [date]. Interval development of [finding].',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'interval,new,development,comparison',
  },
  {
    title: 'Unchanged Compared to Prior',
    description: 'Stable findings',
    content: 'Findings are unchanged compared to prior examination dated [date]. No interval change.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'unchanged,stable,no change,comparison',
  },
  // Recommendations
  {
    title: 'Recommend Follow-up Imaging',
    description: 'Follow-up recommendation',
    content: 'Recommend follow-up [CT/MRI/ultrasound] in [X] [weeks/months] to ensure stability/assess treatment response.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,follow-up,imaging',
  },
  {
    title: 'Recommend Pathologic Correlation',
    description: 'Biopsy recommendation',
    content: 'Recommend pathologic correlation/tissue diagnosis. Consider [CT/ultrasound]-guided biopsy for definitive characterization.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,biopsy,pathology,tissue diagnosis',
  },
  {
    title: 'Clinical Correlation Recommended',
    description: 'Standard clinical recommendation',
    content: 'Recommend clinical correlation and correlation with symptoms and laboratory findings.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,clinical,correlation',
  },
  // Technique descriptions
  {
    title: 'Technique - CT with Contrast',
    description: 'CT contrast technique description',
    content: 'Helical CT images were obtained following administration of [X] mL of intravenous iodinated contrast. Images were reviewed in axial, coronal, and sagittal planes.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'technique,CT,contrast,helical',
  },
  {
    title: 'Technique - MRI Standard',
    description: 'MRI technique description',
    content: 'Multiplanar multisequence MRI was performed including T1-weighted, T2-weighted, and [additional sequences]. [Post-contrast sequences obtained following gadolinium administration].',
    categoryName: 'MRI',
    modality: 'MRI',
    tags: 'technique,MRI,sequences,multiplanar',
  },
  // Measurements
  {
    title: 'Aortic Aneurysm Size Criteria',
    description: 'AAA size reference',
    content: 'Abdominal aortic aneurysm: Normal <3.0 cm; Ectatic 3.0-3.9 cm; Small AAA 4.0-5.4 cm; Medium AAA 5.5-6.4 cm; Large AAA ≥6.5 cm. Surgical repair typically indicated if ≥5.5 cm.',
    categoryName: 'CT',
    bodyPartName: 'Vascular',
    modality: 'CT',
    tags: 'aorta,aneurysm,size,criteria,AAA',
  },
  {
    title: 'Normal Thyroid Size',
    description: 'Thyroid size reference',
    content: 'Normal thyroid dimensions: Each lobe approximately 4-6 cm length, 1.5-2 cm AP, 2-3 cm transverse. Isthmus thickness <5 mm. Total thyroid volume 10-20 mL.',
    categoryName: 'Ultrasound',
    bodyPartName: 'Thyroid',
    modality: 'USG',
    tags: 'thyroid,size,normal,reference',
  },
  // Pathology descriptions
  {
    title: 'Ground Glass Opacity Description',
    description: 'GGO finding description',
    content: 'Ground-glass opacity identified in [location], measuring [X] cm. [Without/With] solid component. [Stable/Changed from prior]. Consider follow-up per Fleischner guidelines.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'ground glass,GGO,nodule,lung',
  },
  {
    title: 'Consolidation Description',
    description: 'Lung consolidation finding',
    content: 'Consolidation identified in [location], involving [X]% of [lobe]. Air bronchograms [present/absent]. [No/With] cavitation. [Infectious/neoplastic] etiology considered.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'consolidation,pneumonia,lung,airspace',
  },
  // Critical findings
  {
    title: 'Critical Finding - Alert Statement',
    description: 'Critical result alert',
    content: 'CRITICAL FINDING: [Describe]. Immediate clinical notification made to [Name, Title] at [Time].',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'critical,alert,notification,urgent',
  },
]

async function main() {
  console.log('Starting additional templates seed...')

  // Get existing categories and body parts
  const categories = await prisma.category.findMany()
  const bodyParts = await prisma.bodyPart.findMany()

  const categoryMap = new Map(categories.map(c => [c.name, c.id]))
  const bodyPartMap = new Map(bodyParts.map(b => [b.name, b.id]))

  // Create additional templates
  console.log('Creating additional templates...')
  let templateCount = 0
  for (const template of additionalTemplates) {
    const categoryId = template.categoryName ? categoryMap.get(template.categoryName) : null
    const bodyPartId = template.bodyPartName ? bodyPartMap.get(template.bodyPartName) : null

    try {
      await prisma.template.create({
        data: {
          title: template.title,
          description: template.description,
          content: template.content,
          categoryId,
          bodyPartId,
          modality: template.modality,
          tags: template.tags,
        },
      })
      templateCount++
    } catch (error) {
      // Template might already exist
    }
  }

  // Create additional snippets
  console.log('Creating additional snippets...')
  let snippetCount = 0
  for (const snippet of additionalSnippets) {
    const categoryId = snippet.categoryName ? categoryMap.get(snippet.categoryName) : null
    const bodyPartId = snippet.bodyPartName ? bodyPartMap.get(snippet.bodyPartName) : null

    try {
      await prisma.snippet.create({
        data: {
          title: snippet.title,
          description: snippet.description,
          content: snippet.content,
          categoryId,
          bodyPartId,
          modality: snippet.modality,
          tags: snippet.tags,
        },
      })
      snippetCount++
    } catch (error) {
      // Snippet might already exist
    }
  }

  // Get final counts
  const totalTemplates = await prisma.template.count()
  const totalSnippets = await prisma.snippet.count()

  console.log('\n========================================')
  console.log('ADDITIONAL TEMPLATES SEED COMPLETED!')
  console.log('========================================')
  console.log(`New templates created: ${templateCount}`)
  console.log(`New snippets created: ${snippetCount}`)
  console.log(`Total templates in database: ${totalTemplates}`)
  console.log(`Total snippets in database: ${totalSnippets}`)
  console.log('========================================')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
