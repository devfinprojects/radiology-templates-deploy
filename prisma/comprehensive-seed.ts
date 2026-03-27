import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================
// COMPREHENSIVE RADIOLOGY TEMPLATES & SNIPPETS
// Based on uploaded directory files
// ============================================

// Categories with icons and colors
const categories = [
  { name: 'CT', description: 'Computed Tomography scans', icon: 'scan', color: 'blue' },
  { name: 'MRI', description: 'Magnetic Resonance Imaging', icon: 'magnet', color: 'purple' },
  { name: 'X-Ray', description: 'Radiography examinations', icon: 'sun', color: 'amber' },
  { name: 'Ultrasound', description: 'Sonography examinations', icon: 'waves', color: 'teal' },
  { name: 'Mammography', description: 'Breast imaging', icon: 'heart', color: 'pink' },
  { name: 'Nuclear Medicine', description: 'PET and SPECT imaging', icon: 'activity', color: 'green' },
  { name: 'Fluoroscopy', description: 'Real-time X-ray imaging', icon: 'video', color: 'orange' },
  { name: 'Interventional', description: 'Image-guided procedures', icon: 'syringe', color: 'red' },
]

// Body parts comprehensive list
const bodyParts = [
  { name: 'Head/Brain', description: 'Neurological imaging' },
  { name: 'Chest/Thorax', description: 'Chest and thoracic cavity' },
  { name: 'Abdomen', description: 'Abdominal organs' },
  { name: 'Pelvis', description: 'Pelvic structures' },
  { name: 'Cervical Spine', description: 'Cervical vertebral column' },
  { name: 'Thoracic Spine', description: 'Thoracic vertebral column' },
  { name: 'Lumbar Spine', description: 'Lumbar vertebral column' },
  { name: 'Whole Spine', description: 'Complete spinal column' },
  { name: 'Upper Extremity', description: 'Arms, shoulders, hands' },
  { name: 'Lower Extremity', description: 'Legs, hips, feet' },
  { name: 'Neck', description: 'Cervical region' },
  { name: 'Cardiac', description: 'Heart and vessels' },
  { name: 'Breast', description: 'Breast tissue' },
  { name: 'Whole Body', description: 'Full body imaging' },
  { name: 'Orbit', description: 'Eye and orbital structures' },
  { name: 'Sinuses', description: 'Paranasal sinuses' },
  { name: 'Temporal Bone', description: 'Ear and temporal region' },
  { name: 'Thyroid', description: 'Thyroid gland' },
  { name: 'Liver', description: 'Hepatic imaging' },
  { name: 'Kidneys', description: 'Renal imaging' },
  { name: 'Prostate', description: 'Prostate gland' },
  { name: 'Obstetric', description: 'Pregnancy imaging' },
  { name: 'Gynecologic', description: 'Female reproductive system' },
  { name: 'Vascular', description: 'Blood vessels' },
  { name: 'MSK General', description: 'Musculoskeletal system' },
]

// ============================================
// COMPREHENSIVE TEMPLATES
// ============================================
const templates = [
  // ========== USG ABDOMEN ==========
  {
    title: 'USG Abdomen Complete - Normal',
    description: 'Complete abdominal ultrasound examination with normal findings',
    content: `ULTRASOUND ABDOMEN - COMPLETE

EXAMINATION: Ultrasound examination of the abdomen.

CLINICAL INDICATION: [Indication]

TECHNIQUE: Real-time grayscale and color Doppler ultrasound of the abdomen was performed using a curvilinear transducer. Standard evaluation of the liver, gallbladder, biliary tree, pancreas, spleen, kidneys, aorta, and peritoneal cavity was performed.

FINDINGS:

LIVER:
- Size: Normal span of approximately 14 cm at the midclavicular line.
- Parenchyma: Normal homogeneous echotexture. No focal lesion identified.
- Echogenicity: Normal, comparable to renal cortex.
- Vasculature: Portal vein patent with hepatopetal flow. Hepatic veins normal.
- No focal hepatic lesion.

GALLBLADDER:
- Size: Normal distension.
- Wall thickness: Normal (<3 mm).
- Lumen: No gallstones, sludge, or polyps identified.
- No pericholecystic fluid.

BILIARY TREE:
- Common bile duct: Measures [X] mm (normal up to 6 mm, +1 mm per decade after 50).
- Intrahepatic ducts: Not dilated.

PANCREAS:
- Head: Normal size and echotexture.
- Body: Normal.
- Tail: Partially visualized, unremarkable.
- Pancreatic duct: Not dilated.

SPLEEN:
- Size: Normal, measuring approximately [X] cm in length.
- Parenchyma: Homogeneous. No focal lesion.

KIDNEYS:
- Right kidney: [X] cm. Normal size, shape, and echotexture. Corticomedullary differentiation maintained. No hydronephrosis or calculus.
- Left kidney: [X] cm. Normal size, shape, and echotexture. Corticomedullary differentiation maintained. No hydronephrosis or calculus.

AORTA AND IVC:
- Abdominal aorta: Normal caliber. No aneurysm.
- IVC: Normal.

FREE FLUID:
- No free fluid in the peritoneal cavity.

LYMPH NODES:
- No pathologic lymphadenopathy.

IMPRESSION:
1. Normal ultrasound examination of the abdomen.
2. No sonographic abnormality identified.

RECOMMENDATIONS:
Clinical correlation. Follow-up as clinically indicated.`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'USG',
    tags: 'usg,ultrasound,abdomen,complete,normal,liver,gallbladder,kidney,spleen',
  },
  {
    title: 'USG Liver - Fatty Liver',
    description: 'Ultrasound evaluation of hepatic steatosis',
    content: `ULTRASOUND LIVER - FATTY LIVER

EXAMINATION: Ultrasound examination of the liver.

CLINICAL INDICATION: [Indication - elevated LFTs, metabolic syndrome, obesity]

TECHNIQUE: Real-time grayscale and color Doppler ultrasound of the liver was performed using a curvilinear transducer. Assessment of hepatic parenchyma, vasculature, and surrounding structures.

FINDINGS:

LIVER:
- Size: [Increased/Normal] span, measuring [X] cm.
- Parenchyma: Diffusely increased echogenicity compared to the right renal cortex.
- Hepatic veins: [Normal/Attenuated] visualization.
- Portal vein: Patent with [normal hepatopetal/reversed] flow.
- Intrahepatic ducts: Not dilated.
- No focal hepatic lesion.

STEATOSIS GRADING:
- Grade [I/II/III] fatty liver:
  * Grade I: Mild - Slightly increased echogenicity, portal veins still visible
  * Grade II: Moderate - Increased echogenicity, portal veins poorly visualized
  * Grade III: Severe - Markedly increased echogenicity, portal veins not visible

GALLBLADDER: [Findings]

SPLEEN: [X] cm. [Normal/Mild splenomegaly]

KIDNEYS: [Findings]

ASCITES: [None/Small/Moderate/Large]

IMPRESSION:
1. Grade [I/II/III] hepatic steatosis (fatty liver).
2. [Additional findings]
3. [Signs of portal hypertension if present]

RECOMMENDATIONS:
Clinical correlation. Consider lifestyle modifications. Follow-up as clinically indicated.`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Liver',
    modality: 'USG',
    tags: 'usg,liver,fatty,steatosis,NAFLD,hepatic,echogenicity',
  },
  {
    title: 'USG Liver - Cirrhosis',
    description: 'Ultrasound findings in hepatic cirrhosis',
    content: `ULTRASOUND LIVER - CIRRHOSIS

EXAMINATION: Ultrasound examination of the liver.

CLINICAL INDICATION: [Indication - known cirrhosis, chronic liver disease]

TECHNIQUE: Real-time grayscale and color Doppler ultrasound with focus on liver parenchyma, vasculature, and signs of portal hypertension.

FINDINGS:

LIVER:
- Size: [Reduced/Normal/Increased], measuring [X] cm.
- Surface: [Smooth/Irregular/Nodular] contour.
- Parenchyma: [Coarse/Heterogeneous] echotexture. [Increased/Decreased] echogenicity.
- Right lobe: [Atrophic/Normal].
- Left lobe: [Hypertrophic/Normal].
- Caudate lobe: [Hypertrophic/Normal].
- No focal hepatic lesion. [Or describe any lesions]

PORTAL VENOUS SYSTEM:
- Main portal vein: [X] mm (normal 10-12 mm). [Patent/Thrombosed].
- Flow direction: [Hepatopetal/Hepatofugal/To-and-fro].
- Portal vein velocity: [X] cm/s.

HEPATIC VEINS:
- [Normal/Attenuated/Dilated].
- Spectral waveform: [Normal/Flattened/Monophasic].

SIGNS OF PORTAL HYPERTENSION:
- Splenomegaly: [Present/Absent]. Spleen measures [X] cm.
- Ascites: [None/Small/Moderate/Large].
- Portosystemic collaterals: [Present/Absent]. Describe: ___
- Recanalized paraumbilical vein: [Present/Absent].

GALLBLADDER: [Findings]. Wall thickening: [Present/Absent].

SPLEEN: [X] cm. [Splenomegaly/Normal size].

KIDNEYS: [Findings]

IMPRESSION:
1. Sonographic features consistent with hepatic cirrhosis.
2. [With/Without] signs of portal hypertension.
3. [Portal vein patency status].
4. [Additional findings].

RECOMMENDATIONS:
Surveillance imaging as per protocol. Gastroenterology follow-up. Consider screening for HCC if cirrhotic.`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Liver',
    modality: 'USG',
    tags: 'usg,liver,cirrhosis,portal hypertension,chronic liver disease,hepatocellular',
  },
  {
    title: 'USG Gallbladder - Acute Cholecystitis',
    description: 'Ultrasound findings of acute cholecystitis',
    content: `ULTRASOUND GALLBLADDER - ACUTE CHOLECYSTITIS

EXAMINATION: Ultrasound examination of the gallbladder and biliary tree.

CLINICAL INDICATION: [Indication - RUQ pain, fever, positive Murphy's sign]

TECHNIQUE: Real-time grayscale and color Doppler ultrasound of the gallbladder and biliary tree. Murphy's sign assessed during examination.

FINDINGS:

GALLBLADDER:
- Size: [Distended/Normal], measuring [X] cm in length.
- Wall thickness: [X] mm (abnormal if >3 mm).
- Wall appearance: [Thickened/Striated/Edematous/Normal].
- Lumen: [Gallstones present/No gallstones].
  * Stone size: [X] mm. Number: [Single/Multiple].
  * Mobility: [Mobile/Impacted at neck/cystic duct].
- Pericholecystic fluid: [Present/Absent].
- Murphy's sign: [Positive/Negative] - [Focal tenderness over gallbladder/No tenderness].
- Color Doppler: [Increased vascularity in gallbladder wall/No increased vascularity].

SONOGRAPHIC MURPHY'S SIGN: [POSITIVE/NEGATIVE]

COMMON BILE DUCT:
- Diameter: [X] mm.
- [Normal/Sludge/Calculus identified].

LIVER: [Normal/Associated findings].

PANCREAS: [Normal/Associated findings].

FREE FLUID: [None/Small amount in RUQ].

COMPLICATIONS:
- Perforation: [No evidence/Questions perforation - describe].
- Abscess: [None/Pericholecystic collection present].
- Empyema: [No/Yes - debris/sedimentation in lumen].

IMPRESSION:
1. Sonographic findings [consistent with/suggestive of] acute cholecystitis.
   - [Gallstones/Impacted stone at cystic duct/No visible stones (acalculous)].
   - Gallbladder wall thickening.
   - [Positive/Negative] sonographic Murphy's sign.
   - [With/Without] pericholecystic fluid.
2. [Biliary tree status].
3. [Complications if present].

RECOMMENDATIONS:
Surgical consultation. Clinical correlation. [Further imaging if needed].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'USG',
    tags: 'usg,gallbladder,cholecystitis,acute,RUQ pain,gallstones,Murphy sign',
  },
  {
    title: 'USG Kidneys - Hydronephrosis',
    description: 'Ultrasound evaluation of hydronephrosis',
    content: `ULTRASOUND KIDNEYS - HYDRONEPHROSIS

EXAMINATION: Ultrasound examination of the kidneys and urinary tract.

CLINICAL INDICATION: [Indication - flank pain, elevated creatinine, known obstruction]

TECHNIQUE: Real-time grayscale and color Doppler ultrasound of both kidneys and urinary bladder.

FINDINGS:

RIGHT KIDNEY:
- Size: [X] x [X] cm. [Normal/Enlarged/Atrophic].
- Cortex: [Normal thickness/Thinned]. Echogenicity: [Normal/Increased].
- Corticomedullary differentiation: [Preserved/Lost].
- Pelvicalyceal system: [Normal/Show hydronephrosis].
- HYDRONEPHROSIS GRADE:
  * Grade 0: No hydronephrosis
  * Grade 1: Mild - Minimal splitting of pelvicalyceal system
  * Grade 2: Moderate - Dilated pelvicalyceal system, calyces rounded
  * Grade 3: Severe - Marked dilation, cortical thinning
  * Grade 4: Severe with cortical atrophy
- Ureter: [Not visualized/Dilated to level of ___].
- Calculus: [None identified/Seen at ___ measuring ___ mm].
- Ureteric jet: [Present/Absent] on color Doppler.

LEFT KIDNEY:
- Size: [X] x [X] cm. [Normal/Enlarged/Atrophic].
- Cortex: [Normal thickness/Thinned].
- Pelvicalyceal system: [Normal/Hydronephrosis Grade ___].
- Calculus: [None identified/Seen at ___ measuring ___ mm].

URINARY BLADDER:
- Distension: [Well-distended/Underfilled].
- Wall: [Normal/Thickened].
- Lumen: [Clear/Catheter bulb seen/Debris/Stones].
- Post-void residual: [X] mL.

URETERS:
- Right ureter: [Not dilated/Dilated].
- Left ureter: [Not dilated/Dilated].

CAUSE OF OBSTRUCTION:
- [Calculus at ___].
- [Pelvic mass compressing ___].
- [Ureteric stricture at ___].
- [Not identified].

IMPRESSION:
1. [Right/Left/Bilateral] hydronephrosis - Grade [I/II/III/IV].
2. [Cause of obstruction if identified].
3. [Renal function assessment].
4. [Complications if present].

RECOMMENDATIONS:
Clinical correlation. [CT urogram if cause not identified]. Urology consultation. Monitor renal function.`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Kidneys',
    modality: 'USG',
    tags: 'usg,kidney,hydronephrosis,obstruction,calculi,renal,ureter',
  },
  {
    title: 'USG Thyroid - Nodule Assessment',
    description: 'Thyroid ultrasound with TI-RADS assessment',
    content: `ULTRASOUND THYROID - NODULE ASSESSMENT

EXAMINATION: Ultrasound examination of the thyroid gland and neck.

CLINICAL INDICATION: [Indication - palpable nodule, abnormal TFTs]

TECHNIQUE: High-frequency linear transducer evaluation of the thyroid gland. Color Doppler assessment of vascularity.

FINDINGS:

THYROID GLAND:
- Right lobe: [X] x [X] x [X] cm. [Normal/Enlarged].
- Left lobe: [X] x [X] x [X] cm. [Normal/Enlarged].
- Isthmus: [X] mm thickness (normal 2-6 mm).
- Total volume: [X] mL.
- Parenchymal echotexture: [Homogeneous/Heterogeneous/Coarse/Nodular].

NODULE(S):

NODULE 1 (Most suspicious/largest):
- Location: [Right lobe - upper/mid/lower / Left lobe - upper/mid/lower / Isthmus].
- Size: [X] x [X] x [X] mm.
- Composition:
  * [Solid]
  * [Predominantly solid - >50% solid]
  * [Spongiform - multiple small cystic spaces]
  * [Mixed cystic and solid - describe % solid]
  * [Cystic]
- Echogenicity: [Hypoechoic/Isoechoic/Hyperechoic/Anechoic].
- Shape: [Wider-than-tall/Taller-than-wide].
- Margins: [Smooth/Ill-defined/Lobulated/Irregular/Extrathyroidal extension].
- Echogenic foci: [None/Large comet-tail artifacts/Macrocalcifications/Peripheral calcifications/Punctate echogenic foci].
- Vascularity (color Doppler): [None/Peripheral/Internal/Both].

TI-RADS ASSESSMENT:
- Composition: Points [0/1/2]
- Echogenicity: Points [0/1/2/3]
- Shape: Points [0/3]
- Margins: Points [0/2/3]
- Echogenic foci: Points [0/1/3]
- TOTAL SCORE: [X]
- TI-RADS CATEGORY: [TR1/TR2/TR3/TR4/TR5]

[Additional nodules described similarly]

CERVICAL LYMPH NODES:
- Central compartment (Level VI): [Normal/Suspicious node - describe].
- Lateral neck (Levels II-V): [Normal/Suspicious node - describe].
- Features of suspicious nodes: [Enlarged/Rounded/No hilum/Cystic change/Calcifications/Peripheral vascularity].

IMPRESSION:
1. Thyroid gland: [Normal/Multinodular goiter/Diffuse disease].
2. Dominant nodule: [X] mm in [location] - TI-RADS [TR1-TR5].
3. [FNA recommendation based on TI-RADS criteria].
4. [Lymph node status].

TI-RADS FNA RECOMMENDATIONS:
- TR1 (Benign): No FNA
- TR2 (Not Suspicious): No FNA
- TR3 (Mildly Suspicious): FNA if ≥2.5 cm
- TR4 (Moderately Suspicious): FNA if ≥1.5 cm
- TR5 (Highly Suspicious): FNA if ≥1.0 cm

RECOMMENDATIONS:
[FNA recommended / Follow-up recommended in X months]. Clinical correlation with thyroid function tests.`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Thyroid',
    modality: 'USG',
    tags: 'usg,thyroid,nodule,TI-RADS,FNA,goiter,endocrine',
  },

  // ========== USG OBSTETRICS ==========
  {
    title: 'USG Obstetric - First Trimester Dating',
    description: 'First trimester obstetric ultrasound for dating and viability',
    content: `ULTRASOUND OBSTETRIC - FIRST TRIMESTER DATING

EXAMINATION: Transabdominal [and transvaginal] obstetric ultrasound.

CLINICAL INDICATION: [Indication - dating, bleeding, pain, routine]

TECHNIQUE: Transabdominal [and transvaginal] ultrasound performed using curvilinear [and endovaginal] transducers.

FINDINGS:

UTERUS:
- Size: [X] x [X] x [X] cm.
- Contour: [Smooth/Irregular/Myomatous].
- Myometrium: [Homogeneous/Fibroids present - describe].
- Endometrium: [Decidual reaction seen/Thickness X mm].

ADNEXA:
- Right ovary: [Visualized - measures X x X cm / Not visualized].
- Left ovary: [Visualized - measures X x X cm / Not visualized].
- Corpus luteum: [Right/Left/Not identified].
- Adnexal masses: [None/Describe if present].

GESTATIONAL SAC:
- Present: [Yes/No].
- Location: [Intrauterine/Ectopic - describe location].
- Shape: [Regular/Rounded/Irregular].
- Mean sac diameter (MSD): [X] mm.
- MSD corresponds to: [X] weeks [X] days.

YOLK SAC:
- Present: [Yes/No].
- Size: [X] mm (normal 3-5 mm at 6-10 weeks).
- Appearance: [Normal - rounded, echogenic rim/Absent/Abnormal - irregular, calcified].

EMBRYO:
- Present: [Yes/No].
- Crown-rump length (CRL): [X] mm.
- CRL corresponds to: [X] weeks [X] days.
- Cardiac activity: [Present/Absent].
- Heart rate: [X] bpm (normal range at 6-10 weeks: 100-170 bpm).

AMNIOTIC FLUID:
- Volume: [Normal/Decreased/Increased].

CERVIX:
- Length: [X] mm (transvaginal measurement preferred).
- Internal os: [Closed/Open/Funneling].

FREE FLUID:
- Pelvis: [None/Small amount/Moderate amount].
- Pouch of Douglas: [Clear/Complex/Hemorrhagic].

DATES ASSESSMENT:
- LMP: [Date] → EDD by LMP: [Date].
- Ultrasound dating: [X] weeks [X] days.
- EDD by ultrasound: [Date].
- Discrepancy: [X] days [within acceptable range/re-dating recommended].

IMPRESSION:
1. [Intrauterine] pregnancy.
2. [Single/Multiple] gestation.
3. Cardiac activity: [Present/Absent].
4. Estimated gestational age: [X] weeks [X] days by CRL.
5. EDD: [Date].
6. [Any concerns/abnormal findings].

RECOMMENDATIONS:
[Routine follow-up / Repeat scan recommended / Clinical correlation].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Obstetric',
    modality: 'USG',
    tags: 'usg,obstetric,pregnancy,dating,first trimester,CRL,viability',
  },
  {
    title: 'USG Obstetric - Second Trimester Anomaly Scan',
    description: 'Detailed fetal anatomy survey at 18-22 weeks',
    content: `ULTRASOUND OBSTETRIC - SECOND TRIMESTER ANOMALY SCAN

EXAMINATION: Transabdominal obstetric ultrasound for fetal anatomy survey.

CLINICAL INDICATION: [Indication - routine anomaly scan at 18-22 weeks]

TECHNIQUE: Detailed transabdominal ultrasound evaluation of fetal anatomy, placenta, amniotic fluid, and maternal structures.

FINDINGS:

GESTATIONAL AGE:
- By LMP: [X] weeks [X] days.
- By current ultrasound: [X] weeks [X] days.
- CRL at dating scan: [X] mm ([X] weeks [X] days).

FETAL BIOMETRY:
- Biparietal diameter (BPD): [X] mm ([X] weeks).
- Head circumference (HC): [X] mm ([X] weeks).
- Abdominal circumference (AC): [X] mm ([X] weeks).
- Femur length (FL): [X] mm ([X] weeks).
- Estimated fetal weight (EFW): [X] g ([X]th percentile).
- All biometry consistent with dates: [Yes/No - discrepancy noted].

FETAL ANATOMY SURVEY:

HEAD AND BRAIN:
- Skull shape: [Normal/Abnormal - describe].
- Cerebral hemispheres: [Normal/Abnormal].
- Lateral ventricles: [Normal/Dilated]. Atrium width: [X] mm (normal <10 mm).
- Choroid plexus: [Normal/Cyst present].
- Cerebellum: [Normal/Abnormal]. Transcerebellar diameter: [X] mm.
- Cisterna magna: [X] mm (normal 2-10 mm).
- Cavum septi pellucidi: [Present/Absent].

FACE:
- Orbits: [Present bilaterally/Abnormal].
- Nasal bone: [Present/Absent].
- Lips: [Intact/Cleft identified].
- Profile: [Normal/Abnormal].

SPINE:
- Cervical: [Normal/Abnormal].
- Thoracic: [Normal/Abnormal].
- Lumbar: [Normal/Abnormal].
- Sacral: [Normal/Abnormal].
- [No evidence of neural tube defect / Spina bifida noted at level ___].

CHEST:
- Lungs: [Normal appearance/Pleural effusion/Cystic lesions].
- Heart:
  * Four-chamber view: [Normal/Abnormal].
  * Outflow tracts: [Visualized/Abnormal].
  * Heart rate: [X] bpm.
  * Cardiac situs: [Normal/Dextrocardia].
- Diaphragm: [Intact/Diaphragmatic hernia].

ABDOMEN:
- Stomach: [Present/Absent/Dilated].
- Kidneys: [Present bilaterally/Unilateral renal agenesis/Abnormal].
- Bladder: [Visualized/Not visualized].
- Umbilical cord insertion: [Normal/Omphalocele/Gastroschisis].
- Umbilical vessels: [Three vessels (two arteries, one vein)/Single umbilical artery].

EXTREMITIES:
- Upper limbs: [Present bilaterally/Movement noted/Abnormal].
- Lower limbs: [Present bilaterally/Movement noted/Abnormal].
- Hands: [Normal/Abnormal - describe].
- Feet: [Normal/Abnormal - describe].

GENITALIA: [Male/Female/Not determined].

PLACENTA:
- Location: [Anterior/Posterior/Fundal/Lateral/Previaminor/Previamajor].
- Grade: [0/I/II/III].
- Cord insertion: [Central/Eccentric/Marginal/Velamentous].
- Placental appearance: [Normal/Abnormal - describe].

AMNIOTIC FLUID:
- Amniotic fluid index (AFI): [X] cm (normal 8-25 cm).
- Single deepest pocket: [X] cm.
- [Normal/Oligohydramnios/Polyhydramnios].

UMBILICAL ARTERY DOPPLER:
- PI: [X].
- RI: [X].
- S/D ratio: [X].
- [Normal/Abnormal - absent/reversed end-diastolic flow].

CERVIX:
- Length: [X] mm.
- Internal os: [Closed/Funneling].

MATERNAL STRUCTURES:
- Uterus: [Normal/Fibroids - describe].
- Adnexa: [Normal/Ovarian cysts - describe].

IMPRESSION:
1. [Single live intrauterine pregnancy].
2. Gestational age: [X] weeks [X] days.
3. Estimated fetal weight: [X] g ([X]th percentile).
4. Fetal anatomy survey: [Normal/Abnormal findings noted above].
5. Placenta: [Location]. [No evidence of placenta previa].
6. Amniotic fluid: [Normal/Oligohydramnios/Polyhydramnios].
7. [Any additional findings or concerns].

RECOMMENDATIONS:
[Routine follow-up / Additional imaging / Specialist referral / Karyotyping if indicated].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Obstetric',
    modality: 'USG',
    tags: 'usg,obstetric,pregnancy,anomaly scan,second trimester,fetal anatomy',
  },

  // ========== USG GYNECOLOGY ==========
  {
    title: 'USG Pelvis - Transvaginal Gynecologic',
    description: 'Transvaginal ultrasound for gynecologic evaluation',
    content: `ULTRASOUND PELVIS - TRANSVAGINAL GYNECOLOGIC

EXAMINATION: Transvaginal ultrasound of the pelvis.

CLINICAL INDICATION: [Indication - pelvic pain, abnormal bleeding, infertility, mass]

TECHNIQUE: Transvaginal ultrasound performed with endovaginal transducer. Grayscale and color Doppler evaluation of uterus, endometrium, and adnexa.

FINDINGS:

UTERUS:
- Position: [Anteverted/Retroverted/Midline].
- Size: [X] x [X] x [X] cm (normal nulliparous: 6-8 x 4-5 x 3-4 cm).
- External contour: [Smooth/Irregular/Lobulated].
- Myometrium:
  * [Homogeneous].
  * [Fibroids present]:
    - Fibroid 1: Location [subserosal/intramural/submucosal], size [X] x [X] cm.
    - Fibroid 2: [Describe].
  * [Adenomyosis features]: Globular uterus, heterogeneous myometrium, subendometrial cysts, asymmetric walls.
  * [Other myometrial findings].

ENDOMETRIUM:
- Thickness: [X] mm.
- Phase: [Proliferative/Secretory/Atrophic].
- Appearance: [Homogeneous/Heterogeneous].
- Endometrial cavity: [Empty/Contents noted].
- [Polyp present]: Size [X] mm. Vascularity on Doppler: [Present/Absent].
- [Fluid in cavity]: [Simple/Complex/Hemorrhagic].
- [Intrauterine device]: [In situ/Displaced/Not seen].

CERVIX:
- Size: [Normal/Enlarged].
- Nabothian cysts: [Present/Absent].
- [Other findings].

RIGHT OVARY:
- Size: [X] x [X] x [X] cm. Volume: [X] mL (normal <10 mL in premenopausal, <5 mL postmenopausal).
- Morphology: [Normal/Polycystic morphology/Cystic/Solid].
- Follicles: [Number and size - normal developing follicles].
- [Cyst present]:
  * Type: [Simple/Complex/Hemorrhagic/Dermoid/Endometrioma].
  * Size: [X] x [X] cm.
  * Features: [Anechoic/Internal echoes/Septations/Solid components].
  * Color Doppler: [No internal flow/Internal vascularity present].
- [Mass present]: Describe size, composition, vascularity.

LEFT OVARY:
- Size: [X] x [X] x [X] cm. Volume: [X] mL.
- Morphology: [Normal/Polycystic morphology/Cystic/Solid].
- [Cyst/Mass present]: Describe as above.

CUL-DE-SAC:
- Free fluid: [None/Small amount/Moderate amount].
- [Complex fluid/hemorrhagic fluid noted].

ADNEXA:
- [Normal bilaterally].
- [Hydrosalpinx present]: Tube diameter [X] mm, [complete/partial] folding.
- [Tubo-ovarian abscess]: Complex cystic mass with internal debris, thickened wall, increased vascularity.
- [Other adnexal mass]: Describe.

DOPPLER ASSESSMENT:
- Uterine arteries: [Normal/Abnormal].
- Ovarian arteries: [Normal/Abnormal].
- Any mass vascularity: [Describe resistive index, pulsatility index if relevant].

IMPRESSION:
1. Uterus: [Normal size and appearance/Abnormal findings as above].
2. Endometrium: [Normal thickness for menstrual cycle phase/Abnormal].
3. Ovaries: [Normal bilaterally/Abnormal findings].
4. [Any pathology identified].
5. [Recommendations based on findings].

RECOMMENDATIONS:
[Clinical correlation / Follow-up ultrasound / MRI if indicated / Gynecology referral].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Gynecologic',
    modality: 'USG',
    tags: 'usg,pelvis,gynecology,transvaginal,uterus,ovary,fibroid,cyst',
  },

  // ========== USG VASCULAR ==========
  {
    title: 'USG Carotid Doppler',
    description: 'Bilateral carotid and vertebral artery Doppler examination',
    content: `CAROTID DOPPLER ULTRASOUND

EXAMINATION: Bilateral carotid and vertebral artery duplex ultrasound.

CLINICAL INDICATION: [Indication - TIA, stroke, carotid bruit, pre-surgical evaluation]

TECHNIQUE: Bilateral carotid and vertebral artery duplex ultrasound performed with grayscale imaging, color Doppler, and spectral Doppler analysis.

FINDINGS:

RIGHT COMMON CAROTID ARTERY:
- Diameter: [X] mm.
- Plaque: [None/Presence confirmed].
  * Plaque characteristics: [Homogeneous/Heterogeneous/Echolucent/Calcified].
  * Extent: [X]% stenosis by diameter.
- PSV: [X] cm/s.
- EDV: [X] cm/s.

RIGHT CAROTID BULB/INTERNAL CAROTID ARTERY:
- Plaque: [None/Presence confirmed].
- PSV: [X] cm/s.
- EDV: [X] cm/s.
- ICA/CCA ratio: [X].
- Stenosis estimation:
  * Normal: PSV <125 cm/s, no plaque
  * <50%: PSV 125-230 cm/s, plaque visible
  * 50-69%: PSV 230-400 cm/s, EDV 100-140 cm/s
  * >70%: PSV >400 cm/s, EDV >140 cm/s
  * Near occlusion: Markedly narrowed lumen, variable velocities
  * Total occlusion: No flow
- [Stenosis grade: X%].

LEFT COMMON CAROTID ARTERY:
- Diameter: [X] mm.
- Plaque: [None/Presence confirmed].
- PSV: [X] cm/s.
- EDV: [X] cm/s.

LEFT CAROTID BULB/INTERNAL CAROTID ARTERY:
- Plaque: [None/Presence confirmed].
- PSV: [X] cm/s.
- EDV: [X] cm/s.
- ICA/CCA ratio: [X].
- [Stenosis grade: X%].

EXTERNAL CAROTID ARTERIES:
- Right: [Patent/Stenosis/Occlusion].
- Left: [Patent/Stenosis/Occlusion].

VERTEBRAL ARTERIES:
- Right vertebral:
  * Flow direction: [Antegrade/Retrograde/Absent].
  * PSV: [X] cm/s.
  * [Dominant/Codominant/Hypoplastic].
- Left vertebral:
  * Flow direction: [Antegrade/Retrograde/Absent].
  * PSV: [X] cm/s.
  * [Dominant/Codominant/Hypoplastic].

SUBCLAVIAN ARTERIES:
- Right: [Patent/Stenosis/Occlusion].
- Left: [Patent/Stenosis/Occlusion].
- Subclavian steal: [Present/Absent]. [Describe if present].

IMPRESSION:
1. RIGHT ICA: [Normal/<50%/50-69%/70-99%/Near occlusion/Total occlusion] stenosis.
2. LEFT ICA: [Normal/<50%/50-69%/70-99%/Near occlusion/Total occlusion] stenosis.
3. Plaque characteristics: [Describe if significant].
4. Vertebral arteries: [Normal/Abnormal findings].
5. [Subclavian steal if present].
6. [Recommendations].

RECOMMENDATIONS:
[Clinical correlation / Vascular surgery referral / Medical management / Follow-up imaging].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Vascular',
    modality: 'USG',
    tags: 'usg,carotid,doppler,stroke,TIA,stenosis,vascular,plaque',
  },
  {
    title: 'USG Lower Limb Venous Doppler',
    description: 'Lower limb venous Doppler for DVT evaluation',
    content: `LOWER LIMB VENOUS DOPPLER

EXAMINATION: Bilateral lower limb venous Doppler ultrasound.

CLINICAL INDICATION: [Indication - leg swelling, suspected DVT, PE, pain]

TECHNIQUE: Bilateral lower limb venous duplex ultrasound performed with grayscale imaging, compression technique, color Doppler, and spectral Doppler. Evaluation from common femoral vein to calf veins.

FINDINGS:

RIGHT LOWER LIMB:

COMMON FEMORAL VEIN:
- Compressibility: [Complete/Incomplete].
- Lumen: [Anechoic/Echogenic thrombus].
- Color Doppler: [Spontaneous flow/Absent flow/Partial flow].
- Phasicity: [Phasic/Continuous/Absent].

FEMORAL VEIN (Proximal/Mid/Distal):
- Compressibility: [Complete/Incomplete at ___].
- Thrombus: [None/Acute/Chronic].
- Color flow: [Normal filling defect/Absent].

POPLITEAL VEIN:
- Compressibility: [Complete/Incomplete].
- Thrombus: [None/Acute/Chronic].

GREAT SAPHENOUS VEIN:
- [Patent/Thrombosed].
- SFJ: [Patent/Thrombus extending into ___].

SMALL SAPHENOUS VEIN:
- [Patent/Thrombosed].

CALF VEINS (Posterior tibial, Peroneal, Gastrocnemius):
- [Patent/Thrombosed].
- Compressibility: [Complete/Incomplete].

LEFT LOWER LIMB:

COMMON FEMORAL VEIN:
- Compressibility: [Complete/Incomplete].
- Lumen: [Anechoic/Echogenic thrombus].
- Color Doppler: [Spontaneous flow/Absent flow/Partial flow].

FEMORAL VEIN:
- Compressibility: [Complete/Incomplete at ___].
- Thrombus: [None/Acute/Chronic].

POPLITEAL VEIN:
- Compressibility: [Complete/Incomplete].
- Thrombus: [None/Acute/Chronic].

SAPHENOUS VEINS:
- Great saphenous: [Patent/Thrombosed].
- Small saphenous: [Patent/Thrombosed].

CALF VEINS:
- [Patent/Thrombosed].

THROMBUS CHARACTERISTICS (if present):
- Echogenicity: [Anechoic/Hypoechoic/Heterogeneous/Echogenic].
- Non-compressibility: [Complete/Partial].
- Distension of vein: [Present/Absent].
- Collateral veins: [Present/Absent].
- Chronicity: [Acute/Chronic features].

DEEP VENOUS INSUFFICIENCY (if assessed):
- Reflux duration: [X] seconds (abnormal if >0.5s femoral, >1.0s superficial).
- Location: [Describe affected segments].

IMPRESSION:
1. RIGHT lower limb: [No evidence of DVT / DVT present at ___].
   - [Acute/Chronic] DVT involving [vessels].
   - [Proximal/Calf only] involvement.
2. LEFT lower limb: [No evidence of DVT / DVT present at ___].
3. [Superficial thrombophlebitis if present].
4. [Chronic venous disease if present].

RECOMMENDATIONS:
[Anticoagulation / Clinical correlation / Repeat scan if needed / IVC filter consideration if contraindication to anticoagulation].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Vascular',
    modality: 'USG',
    tags: 'usg,doppler,DVT,venous,thrombosis,leg,swelling,embolism',
  },

  // ========== USG SMALL PARTS ==========
  {
    title: 'USG Breast - BI-RADS Assessment',
    description: 'Breast ultrasound with BI-RADS classification',
    content: `ULTRASOUND BREAST - BI-RADS ASSESSMENT

EXAMINATION: Ultrasound of the [right/left/bilateral] breast(s).

CLINICAL INDICATION: [Indication - palpable mass, screening, nipple discharge, pain]

TECHNIQUE: High-frequency linear transducer evaluation of the [right/left/bilateral] breast(s). Targeted evaluation of [area of concern]. Color Doppler assessment performed.

FINDINGS:

BACKGROUND BREAST TISSUE:
- [Homogeneous fatty/Homogeneous fibroglandular/Heterogeneous].

RIGHT BREAST:

[Clock face location system - outer upper: 9-12 o'clock, outer lower: 6-9 o'clock, inner upper: 12-3 o'clock, inner lower: 3-6 o'clock]

LESION [Location: clock face + distance from nipple]:
- Location: [X] o'clock, [X] cm from nipple.
- Size: [X] x [X] x [X] mm.
- Shape: [Oval/Round/Irregular].
- Orientation: [Parallel/Not parallel].
- Margin: [Circumscribed/Indistinct/Angular/Microlobulated/Spiculated].
- Echo pattern: [Anechoic/Hyperechoic/Complex cystic and solid/Hypoechoic/Heterogeneous].
- Posterior features: [No posterior features/Enhancement/Shadowing/Combined pattern].
- Calcifications: [Absent/Present - macrocalcifications/microcalcifications].
- Associated features: [None/Architectural distortion/Duct changes/Skin changes/Edema].
- Special cases: [None/Clustered microcysts/Complicated cyst/Intracystic mass].
- Color Doppler: [No internal vascularity/Internal vascularity present].

ADDITIONAL FINDINGS:
- [Other lesions or abnormalities].

AXILLA (Right):
- Lymph nodes: [Normal/Enlarged/Suspicious].
- Cortical thickness: [X] mm (normal <3 mm).
- Hilum: [Preserved/Lost].
- Morphology: [Oval/Reniform/Round].
- Color Doppler: [Hilar flow/Peripheral flow].

LEFT BREAST:

[Similar description as above]

AXILLA (Left):
- Lymph nodes: [Normal/Enlarged/Suspicious].

BI-RADS ULTRASOUND ASSESSMENT:

BI-RADS CATEGORY:
- Category 1: Negative
- Category 2: Benign
- Category 3: Probably Benign (≤2% malignant potential)
- Category 4: Suspicious
  * 4A: Low suspicion (2-10%)
  * 4B: Moderate suspicion (10-50%)
  * 4C: High suspicion (50-95%)
- Category 5: Highly Suggestive of Malignancy (≥95%)
- Category 6: Known Biopsy-Proven Malignancy

RIGHT BREAST: BI-RADS [Category]
LEFT BREAST: BI-RADS [Category]

IMPRESSION:
1. RIGHT BREAST: [Finding]. BI-RADS [Category].
   - [Recommendation based on category].
2. LEFT BREAST: [Finding]. BI-RADS [Category].
   - [Recommendation based on category].
3. [Axillary lymph node status].

BI-RADS RECOMMENDATIONS BY CATEGORY:
- Category 1-2: Routine screening
- Category 3: Short-interval follow-up (6 months)
- Category 4: Tissue diagnosis (biopsy)
- Category 5: Biopsy and appropriate action
- Category 6: Appropriate action for known cancer

RECOMMENDATIONS:
[Biopsy / Short-term follow-up / Routine screening / Correlation with mammography / MRI if indicated].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'Breast',
    modality: 'USG',
    tags: 'usg,breast,BI-RADS,nodule,mass,mammography,biopsy',
  },
  {
    title: 'USG Scrotum',
    description: 'Scrotal ultrasound examination',
    content: `ULTRASOUND SCROTUM

EXAMINATION: Ultrasound examination of the scrotum.

CLINICAL INDICATION: [Indication - testicular pain, mass, infertility, trauma]

TECHNIQUE: High-frequency linear transducer evaluation of both testes and epididymides. Grayscale and color Doppler assessment.

FINDINGS:

RIGHT TESTIS:
- Size: [X] x [X] x [X] cm. Volume: [X] mL.
- Parenchyma: [Homogeneous/Heterogeneous].
- Echotexture: [Normal/Abnormal].
- Focal lesions: [None/Describe].
  * Lesion: Location [upper/mid/lower pole], size [X] x [X] cm.
  * Characteristics: [Solid/Cystic/Mixed].
  * Echogenicity: [Hypoechoic/Hyperechoic/Isoechoic/Anechoic].
  * Calcifications: [Absent/Present - macrocalcifications/microcalcifications].
  * Color Doppler: [No internal flow/Internal vascularity present].
- Microlithiasis: [Absent/Present - few/numerous].
- Mediastinum testis: [Normal/Thickened].

RIGHT EPIDIDYMIS:
- Head: [Normal/Enlarged/Cystic/Mass].
- Body: [Normal/Thickened].
- Tail: [Normal/Abnormal].
- Size: Head [X] mm (normal 10-12 mm).
- Echogenicity: [Normal/Hypoechoic/Heterogeneous].

RIGHT SPERMATIC CORD:
- [Normal/Varicocele present].
- Valsalva maneuver: [No reflux/Reflux present].

LEFT TESTIS:
- Size: [X] x [X] x [X] cm. Volume: [X] mL.
- Parenchyma: [Homogeneous/Heterogeneous].
- Focal lesions: [None/Describe].

LEFT EPIDIDYMIS:
- [Normal/Abnormal findings].

LEFT SPERMATIC CORD:
- [Normal/Varicocele present].
- Varicocele grade: 
  * Grade 1: Reflux only during Valsalva
  * Grade 2: Prominent veins at rest, increase with Valsalva
  * Grade 3: Large veins visible through scrotal skin

SCROTAL WALL:
- [Normal/Thickened].
- Hydrocele: [None/Right/Left/Bilateral]. Volume: [X] mL.
- [Simple/Complex/Septated].

TESTICULAR BLOOD FLOW:
- Right testis: [Normal/Hyperemic/Absent].
- Left testis: [Normal/Hyperemic/Absent].
- Pattern: [Normal symmetric flow/Asymmetric flow].

PENILE ULTRASOUND (if performed):
- [Findings].

IMPRESSION:
1. RIGHT testis: [Normal/Abnormal findings].
2. LEFT testis: [Normal/Abnormal findings].
3. Epididymides: [Normal/Abnormal].
4. [Hydrocele/Varicocele if present].
5. [Signs of torsion/orchitis/epididymitis if present].

RECOMMENDATIONS:
[Clinical correlation / Urology referral / Follow-up imaging].`,
    categoryName: 'Ultrasound',
    bodyPartName: 'MSK General',
    modality: 'USG',
    tags: 'usg,scrotum,testis,epididymis,hydrocele,varicocele,testicular pain',
  },

  // ========== CT BRAIN ==========
  {
    title: 'CT Brain - Acute Stroke',
    description: 'CT brain protocol for acute stroke evaluation',
    content: `CT BRAIN - ACUTE STROKE PROTOCOL

EXAMINATION: Non-contrast CT brain with CT angiography and CT perfusion.

CLINICAL INDICATION: [Indication - acute stroke symptoms, last known well time]

TECHNIQUE: Non-contrast CT of the brain from skull base to vertex. CT angiography of the head and neck following IV contrast. CT perfusion performed.

COMPARISON: [Previous imaging if available]

FINDINGS:

NON-CONTRAST CT BRAIN:

EARLY ISCHEMIC CHANGES:
- Hyperdense vessel sign: [Present/Absent].
  * Location: [MCA/ICA/Basilar].
- Loss of insular ribbon: [Present/Absent].
- Obscuration of lentiform nucleus: [Present/Absent].
- Loss of gray-white differentiation: [Present/Absent].
- Cortical ribbon sign: [Present/Absent].

ASPECTS SCORE (Alberta Stroke Program Early CT Score):
- Regions evaluated: M1, M2, M3, M4, M5, M6, caudate, lentiform, insula, internal capsule.
- ASPECTS score: [X]/10 (0 = worst, 10 = best).
- [Favorable if ≥7].

INTRACRANIAL HEMORRHAGE:
- [None identified].
- [Present]: Location [___], size [X] mL.

MASS EFFECT:
- Midline shift: [None/X mm].
- Ventricular compression: [None/Mild/Moderate/Severe].
- Sulcal effacement: [None/Present].

CT ANGIOGRAPHY:

ANTERIOR CIRCULATION:
- Right ICA: [Patent/Stenosis/Occlusion].
- Left ICA: [Patent/Stenosis/Occlusion].
- Right MCA (M1 segment): [Patent/Thrombus/Occlusion].
- Left MCA (M1 segment): [Patent/Thrombus/Occlusion].
- Right ACA: [Patent/Occlusion].
- Left ACA: [Patent/Occlusion].

POSTERIOR CIRCULATION:
- Basilar artery: [Patent/Thrombus/Occlusion].
- Right vertebral: [Patent/Stenosis/Occlusion].
- Left vertebral: [Patent/Stenosis/Occlusion].
- Right PCA: [Patent/Occlusion].
- Left PCA: [Patent/Occlusion].

COLLATERAL FLOW:
- [Good/Moderate/Poor] collateral circulation to affected territory.

CT PERFUSION:

RIGHT HEMISPHERE:
- CBF (Cerebral Blood Flow): [Normal/Reduced].
- CBV (Cerebral Blood Volume): [Normal/Reduced].
- MTT (Mean Transit Time): [Normal/Prolonged].
- Tmax: [Normal/Prolonged].

LEFT HEMISPHERE:
- CBF: [Normal/Reduced].
- CBV: [Normal/Reduced].
- MTT: [Normal/Prolonged].

MISMATCH ANALYSIS:
- Core (CBF <30% of contralateral): [X] mL.
- Penumbra (Tmax >6s): [X] mL.
- Mismatch volume: [X] mL.
- Mismatch ratio: [X].
- [Favorable mismatch if core <70 mL and mismatch ratio >1.8].

THROMBECTOMY CANDIDACY:
- Large vessel occlusion: [Present/Absent].
- Location: [ICA/MCA-M1/MCA-M2/Basilar].
- Time from onset: [X] hours.
- [Within/Outside] window for intervention.

OLD INFARCTS:
- [None/Chronic lacunar infarcts in ___].
- [Chronic territorial infarct in ___].

IMPRESSION:
1. ACUTE STROKE FINDINGS:
   - [Large vessel occlusion at ___].
   - Early ischemic changes in [territory], ASPECTS [X].
   - CT perfusion: Core [X] mL, Penumbra [X] mL.
   - Mismatch: [Present/Absent].
2. [Thrombolysis/Thrombectomy candidacy assessment].
3. [Other significant findings].

RECOMMENDATIONS:
[Emergent neurology/neurosurgery consultation / Thrombolysis if indicated / Thrombectomy consideration / Close monitoring].`,
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'ct,brain,stroke,ASPECTS,thrombectomy,CTA,CTP,LVO,MCA',
  },
  {
    title: 'CT Brain - Trauma',
    description: 'CT brain for traumatic brain injury evaluation',
    content: `CT BRAIN - TRAUMA

EXAMINATION: Non-contrast CT of the brain.

CLINICAL INDICATION: [Indication - head trauma, GCS score, mechanism]

TECHNIQUE: Non-contrast helical CT of the brain from skull base to vertex.

COMPARISON: [Previous imaging if available]

FINDINGS:

SKULL:
- Vault fracture: [None/Linear/Depressed/Comminuted].
  * Location: [___].
  * Depression depth: [X] mm.
- Skull base fracture: [None/Present].
  * Location: [Temporal/ Sphenoid/Occipital].
  * Pneumocephalus associated: [Yes/No].

PNEUMOCEPHALUS:
- [None/Intraventricular/Subarachnoid/Subdural/Epidural].
- Volume: [Trace/Small/Moderate/Large].

EXTRA-AXIAL HEMORRHAGE:

EPIDURAL HEMATOMA:
- [None/Right/Left].
- Location: [Temporal/Parietal/Frontal/Occipital].
- Size: [X] x [X] cm. Thickness: [X] mm.
- Mass effect: [None/Present - describe].

SUBDURAL HEMATOMA:
- [None/Acute/Subacute/Chronic].
- Location: [Right/Left/Bilateral].
- Laterality: [Convex/Concave].
- Size: [X] mm thickness. Extent: [Number of cm].
- Midline shift: [None/X mm].
- [Mixed density suggesting acute on chronic: Yes/No].

SUBARACHNOID HEMORRHAGE:
- [None/Present].
- Distribution: [Convexity/Basal/Sylvian/Interhemispheric].
- Traumatic pattern: [Yes - superficial sulcal/No].
- Amount: [Thin layer/Thick collection].

INTRAPARENCHYMAL HEMORRHAGE:
- [None/Present].
- Location: [Frontal/Temporal/Parietal/Occipital/Basal ganglia/Brainstem/Cerebellum].
- Size: [X] x [X] cm. Volume approximately [X] mL.
- Contusion pattern: [Coup/Contrecoup/Gliding].
- Surrounding edema: [None/Mild/Moderate/Severe].

INTRAVENTRICULAR HEMORRHAGE:
- [None/Present].
- Location: [Lateral/Third/Fourth ventricle].
- Amount: [Trace/Small/Moderate/Severe].

DIFFUSE AXONAL INJURY:
- [No evidence/Cannot assess on non-contrast CT].
- [Suspected based on]: [Small hemorrhagic foci in corpus callosum/Brainstem/Gray-white junction].

BRAIN PARENCHYMA:
- Gray-white differentiation: [Preserved/Lost].
- Edema: [None/Cerebral swelling].
- Cisterns: [Open/Compressed].
- [Signs of herniation if present]:
  * Subfalcine: [Yes/No]. Midline shift: [X] mm.
  * Uncal: [Yes/No].
  * Tonsillar: [Yes/No].

VENTRICLES:
- Size: [Normal/Enlarged].
- Compression: [None/Present].
- Hydrocephalus: [None/Present].

CALCIFICATIONS/INCIDENTAL FINDINGS:
- [None/Describe].

SOFT TISSUES:
- Scalp swelling: [None/Describe location and extent].
- Subgaleal hematoma: [None/Present].

IMPRESSION:
1. SKULL FRACTURE: [None/Describe].
2. INTRACRANIAL HEMORRHAGE:
   - [Epidural/Subdural/Subarachnoid/Intraparenchymal/Intraventricular].
   - [Size and location].
3. MASS EFFECT: [None/Midline shift X mm/Herniation].
4. PNEUMOCEPHALUS: [None/Present].
5. OTHER INJURIES: [Contusions/Edema].
6. [Clinical recommendations].

SEVERITY ASSESSMENT:
- Marshall CT Classification: [Grade I-VI].
- Rotterdam CT Score: [X]/6.

RECOMMENDATIONS:
[Neurosurgery consultation / ICU admission / Repeat CT in X hours / Clinical observation].`,
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'ct,brain,trauma,hemorrhage,fracture,SDH,EDH,SAH,TBI',
  },

  // ========== CT CHEST ==========
  {
    title: 'CT Chest - Pulmonary Embolism (CTPA)',
    description: 'CT pulmonary angiogram for PE evaluation',
    content: `CT PULMONARY ANGIOGRAPHY (CTPA)

EXAMINATION: CT pulmonary angiography.

CLINICAL INDICATION: [Indication - suspected pulmonary embolism, dyspnea, chest pain, DVT]

TECHNIQUE: CT pulmonary angiography performed following bolus tracking technique. Images reviewed in axial, coronal, and sagittal planes. Lung windows also evaluated.

COMPARISON: [Previous imaging if available]

FINDINGS:

PULMONARY ARTERIES:

MAIN PULMONARY ARTERY:
- Diameter: [X] mm (normal <29 mm).
- Filling defect: [None/Present].

RIGHT PULMONARY ARTERY:
- [Patent/Filling defect present].
- Location of thrombus: [Main/Interlobar/Lobar/Segmental/Subsegmental].

LEFT PULMONARY ARTERY:
- [Patent/Filling defect present].
- Location of thrombus: [Main/Interlobar/Lobar/Segmental/Subsegmental].

PULMONARY EMBOLISM:
- [NONE IDENTIFIED].
- [PRESENT]:
  * Central: [Main/Right/Left PA].
  * Lobar: [Right upper/middle/lower lobe PA / Left upper/lower lobe PA].
  * Segmental: [List affected segments].
  * Subsegmental: [Present/Absent].
  * Extent: [X]% of pulmonary vascular bed.
  * [Acute/Chronic appearing].
  * Saddle embolus: [Present/Absent].

RIGHT HEART STRAIN:
- RV/LV ratio: [X] (normal <1.0, abnormal >1.0).
- RV size: [Normal/Enlarged].
- Interventricular septum: [Normal/Bowes into LV].
- IVC contrast reflux: [None/Into hepatic veins].

LUNGS:
- Pulmonary infarction: [None/Wedge-shaped consolidation at ___].
- Parenchymal abnormalities: [Describe].
- Pleural effusions: [None/Right/Left/Bilateral].

DEEP VENOUS THROMBOSIS (if lower limb included):
- [Not assessed/No DVT identified/DVT present in ___].

OTHER FINDINGS:
- Cardiac: [Heart size, coronary calcifications, pericardium].
- Mediastinum: [Lymph nodes, masses].
- Aorta: [Size, aneurysm, dissection].
- Chest wall: [Bones, soft tissues].
- Upper abdomen: [Incidental findings].

IMPRESSION:
1. PULMONARY EMBOLISM: [Negative/Positive].
   - If positive: [Location and extent].
   - [Acute/Chronic] appearance.
   - [With/Without] right heart strain.
2. [Pulmonary infarction if present].
3. [Other significant findings].

CLINICAL DECISION SUPPORT:
- Well's Score considerations.
- [High/Intermediate/Low] burden PE.
- [Hemodynamically stable/unstable].

RECOMMENDATIONS:
[Anticoagulation / Clinical correlation / Lower limb Doppler if not performed / Repeat CTPA if clinical deterioration].`,
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'ct,CTPA,pulmonary embolism,PE,thrombus,chest pain,dyspnea',
  },
  {
    title: 'CT Chest - Lung Cancer Staging',
    description: 'CT chest for lung cancer staging',
    content: `CT CHEST - LUNG CANCER STAGING

EXAMINATION: Contrast-enhanced CT of the chest.

CLINICAL INDICATION: [Indication - known or suspected lung cancer, staging]

TECHNIQUE: Contrast-enhanced CT of the chest from thoracic inlet to adrenal glands. Thin-section images obtained. Multiplanar reformats reviewed.

COMPARISON: [Previous imaging if available]

FINDINGS:

PRIMARY TUMOR:
- Location: [Lobe: RUL/RML/RLL/LUL/LLL].
- Segment: [Specify].
- Size: [X] x [X] x [X] cm.
- Average diameter: [X] cm.
- Density: [Solid/Part-solid/Ground-glass/Mixed].
- Ground-glass component: [X] cm (if part-solid).
- Margins: [Spiculated/Lobulated/Smooth/Irregular].
- Enhancement: [Homogeneous/Heterogeneous/Necrotic].
- Cavitation: [Absent/Present - wall thickness X mm].
- Calcification: [Absent/Present].
- Air bronchogram: [Present/Absent].
- Adjacent structures: [Chest wall invasion/Mediastinal invasion/Vascular invasion].

T-STAGING:
- T1: ≤3 cm, surrounded by lung/visceral pleura
  * T1mi: Minimally invasive ≤3 cm adenocarcinoma
  * T1a: ≤1 cm
  * T1b: >1-2 cm
  * T1c: >2-3 cm
- T2: >3-5 cm OR invasion of main bronchus/visceral pleura/atelectasis
  * T2a: >3-4 cm
  * T2b: >4-5 cm
- T3: >5-7 cm OR chest wall invasion/phrenic nerve invasion/pericardial invasion
- T4: >7 cm OR mediastinum/heart/great vessels/trachea/esophagus/vertebra invasion

REGIONAL LYMPH NODES:

NODAL STATIONS (IASLC):
- Station 1: [Normal/Enlarged - X cm].
- Station 2R/2L: [Normal/Enlarged].
- Station 3A/3P: [Normal/Enlarged].
- Station 4R/4L: [Normal/Enlarged].
- Station 5: [Normal/Enlarged].
- Station 6: [Normal/Enlarged].
- Station 7: [Normal/Enlarged].
- Station 8: [Normal/Enlarged].
- Station 9: [Normal/Enlarged].
- Station 10R/10L: [Normal/Enlarged].
- Station 11R/11L: [Normal/Enlarged].
- Station 12-14: [Normal/Enlarged].

N-STAGING:
- N0: No regional node metastasis
- N1: Ipsilateral peribronchial/ipsilateral hilar nodes
- N2: Ipsilateral mediastinal/subcarinal nodes
- N3: Contralateral mediastinal/hilar nodes, supraclavicular nodes

DISTANT METASTASIS:

M-STAGING:
- Contralateral lung nodules: [None/Present].
- Pleural effusion: [None/Present - malignant appearing].
- Pleural nodules: [None/Present].
- Bone metastases: [None/Present/Suspicious - describe].
- Liver metastases: [None/Present - describe].
- Adrenal metastases: [None/Present/Indeterminate - describe].
- Brain: [Not assessed/Previously imaged].

TNM STAGING (AJCC 8th Edition):
- T: [T1a-T4]
- N: [N0-N3]
- M: [M0/M1a/M1b/M1c]
- Stage: [IA1-IV]

OTHER FINDINGS:
- Lungs: [Emphysema/Fibrosis/Other nodules].
- Heart: [Size/Coronary calcifications/Pericardial effusion].
- Great vessels: [Aorta/PA size].
- Esophagus: [Findings].
- Chest wall: [Rib lesions/Chest wall invasion].
- Upper abdomen: [Adrenals/Liver/Spleen].

IMPRESSION:
1. PRIMARY LUNG NEOPLASM:
   - Location: [Lobe].
   - Size: [X] cm.
   - T-stage: [TX].
2. NODAL STATUS: [NX].
3. DISTANT METASTASIS: [MX].
4. TNM STAGE: [Stage X].
5. [Resectability assessment].
6. [Other significant findings].

RECOMMENDATIONS:
[Pathologic confirmation / PET-CT for complete staging / Multidisciplinary tumor board discussion / Surgical referral / Biopsy of accessible lesion].`,
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'ct,chest,lung cancer,staging,TNM,NSCLC,nodule,tumor,oncology',
  },

  // ========== CT ABDOMEN ==========
  {
    title: 'CT Abdomen/Pelvis - Acute Appendicitis',
    description: 'CT for suspected acute appendicitis',
    content: `CT ABDOMEN/PELVIS - ACUTE APPENDICITIS

EXAMINATION: CT of the abdomen and pelvis [with IV contrast / with IV and oral contrast].

CLINICAL INDICATION: [Indication - RLQ pain, fever, leukocytosis, suspected appendicitis]

TECHNIQUE: CT of the abdomen and pelvis performed [with IV contrast / with IV and oral contrast]. Images reviewed in axial, coronal, and sagittal planes.

COMPARISON: [Previous imaging if available]

FINDINGS:

APPENDIX:
- Visualized: [Yes/No].
- Location: [Pelvic/Retrocecal/Subhepatic/Other].
- Diameter: [X] mm (abnormal if >6 mm).
- Wall thickness: [X] mm.
- Wall enhancement: [Present/Absent/Target sign].
- Lumen: [Patent/Occluded/Fecalith present].
- Appendicolith: [Present/Absent]. Size: [X] mm.

SIGNS OF APPENDICITIS:
- Appendiceal dilation: [Present/Absent].
- Wall thickening: [Present/Absent].
- Mural hyperenhancement: [Present/Absent].
- Periappendiceal fat stranding: [Present/Absent].
- Periappendiceal fluid: [Present/Absent].
- Appendiceal wall defect: [None/Suggestive of perforation].
- Adjacent fascial thickening: [Present/Absent].

COMPLICATIONS:
- Perforation: [No evidence/Yes].
  * Extraluminal air: [Present/Absent].
  * Abscess: [Present/Absent]. Size: [X] x [X] cm.
- Peritonitis: [Localized/Generalized].
- Appendiceal mass: [Present/Absent].

CECUM AND TERMINAL ILEUM:
- Cecal wall: [Normal/Thickened].
- Terminal ileum: [Normal/Thickened/Inflamed].
- Arrowhead sign: [Present/Absent].
- Cecal bar sign: [Present/Absent].

LIVER: [Normal findings / Pathology].

GALLBLADDER: [Normal / Stones / Inflammation].

PANCREAS: [Normal / Pathology].

SPLEEN: [Normal / Pathology].

KIDNEYS: [Normal / Calculi / Hydronephrosis].

BLADDER: [Normal / Pathology].

FREE FLUID:
- [None / Small amount in pelvis / Moderate / Large].

FREE AIR:
- [None / Intraperitoneal free air at ___].

LYMPH NODES:
- Mesenteric: [Normal/Enlarged].
- Retroperitoneal: [Normal/Enlarged].

IMPRESSION:
1. [POSITIVE/NEGATIVE] for acute appendicitis.
   - Appendix diameter: [X] mm.
   - [With/Without] complications:
     * [Perforation/Abscess/Peritonitis].
2. [Alternative diagnosis if appendicitis not present].
3. [Other significant findings].

APPENDICITIS SEVERITY:
- Uncomplicated: Inflamed appendix without perforation/abscess.
- Complicated: Perforation, abscess, or periappendiceal phlegmon.

RECOMMENDATIONS:
[Surgical consultation / Appendectomy / Antibiotics / Percutaneous drainage if abscess / Clinical correlation].`,
    categoryName: 'CT',
    bodyPartName: 'Abdomen',
    modality: 'CT',
    tags: 'ct,appendicitis,abdomen,RLQ pain,appendicolith,abscess,acute abdomen',
  },
  {
    title: 'CT Abdomen/Pelvis - Diverticulitis',
    description: 'CT evaluation of acute diverticulitis',
    content: `CT ABDOMEN/PELVIS - DIVERTICULITIS

EXAMINATION: CT of the abdomen and pelvis with IV contrast.

CLINICAL INDICATION: [Indication - LLQ pain, fever, suspected diverticulitis]

TECHNIQUE: CT of the abdomen and pelvis with IV contrast. Images reviewed in axial, coronal, and sagittal planes.

COMPARISON: [Previous imaging if available]

FINDINGS:

COLON:
- Diverticulosis: [Present/Absent].
- Distribution: [Sigmoid/Descending/Transverse/Ascending/Right colon/Pancolonic].
- Severity: [Mild/Moderate/Severe].

SIGMOID COLON:
- Wall thickening: [Present/Absent]. Thickness: [X] mm.
- Length of involvement: [X] cm.
- Mural hyperenhancement: [Present/Absent].
- Pericolonic fat stranding: [Present/Absent].
- Pericolonic fluid: [Present/Absent].
- Complications: [See below].

COMPLICATIONS:

PERFORATION:
- [None/Microperforation/Gross perforation].
- Extraluminal air: [Absent/Small amounts/Moderate/Large].
- Location of free air: [Pericolonic/Distant intraperitoneal/Retroperitoneal].

ABSCESS:
- [None/Present].
- Location: [Pericolonic/Intraperitoneal/Distant].
- Size: [X] x [X] cm.
- [Simple/Complex with air].

FISTULA:
- [None/Suspected/Confirmed].
- Type: [Colovesical/Colocutaneous/Coloenteric/Colovaginal].

OBSTRUCTION:
- [None/Partial/Complete].
- Transition point: [Location].
- Proximal dilation: [Small bowel/Large bowel].

OTHER COLONIC FINDINGS:
- Mass lesion: [None/Suspected]. If suspected, describe.
- Colitis: [None/Suspected segmental colitis associated with diverticulitis].

LIVER: [Normal findings / Abscess / Metastases].

GALLBLADDER: [Normal / Stones / Inflammation].

KIDNEYS: [Normal / Calculi / Hydronephrosis].

BLADDER:
- Wall thickening: [None/Present - consider fistula].
- Air in bladder: [None/Present - suggests colovesical fistula].

FREE FLUID: [None/Present].

LYMPH NODES: [Normal/Reactive/Pathologic].

IMPRESSION:
1. [POSITIVE/NEGATIVE] for acute diverticulitis.
   - Location: [Sigmoid/Other segment].
   - Severity grading:
     * Mild: Localized wall thickening and fat stranding
     * Moderate: Abscess <4 cm
     * Severe: Abscess >4 cm, free perforation, distant abscess
   - [With/Without] complications: [List].
2. [Alternative diagnosis if not diverticulitis].
3. [Other significant findings].

HINCHEY CLASSIFICATION:
- Stage I: Pericolic abscess confined by mesentery
- Stage II: Pelvic abscess extending beyond colon
- Stage III: Purulent peritonitis
- Stage IV: Feculent peritonitis

RECOMMENDATIONS:
[Medical management / Antibiotics / Percutaneous drainage / Surgical consultation / Colonoscopy after resolution to exclude malignancy].`,
    categoryName: 'CT',
    bodyPartName: 'Abdomen',
    modality: 'CT',
    tags: 'ct,diverticulitis,sigmoid,LLQ pain,diverticulosis,abscess,colon',
  },

  // ========== MRI BRAIN ==========
  {
    title: 'MRI Brain - Multiple Sclerosis',
    description: 'MRI brain for demyelination and MS evaluation',
    content: `MRI BRAIN - DEMYELINATION/MULTIPLE SCLEROSIS PROTOCOL

EXAMINATION: MRI brain with and without contrast.

CLINICAL INDICATION: [Indication - suspected MS, known MS follow-up, demyelination]

TECHNIQUE: Multiplanar multisequence MRI of the brain including:
- Sagittal T1, T2, FLAIR
- Axial T1, T2, FLAIR, DWI, ADC, SWI
- Coronal T2, FLAIR
- Post-contrast T1 in axial, coronal, sagittal planes

COMPARISON: [Previous MRI date]

FINDINGS:

WHITE MATTER LESIONS:

PERIVENTRICULAR LESIONS:
- Number: [X] lesions.
- Location: [Adjacent to lateral ventricles/Dawson's finger pattern].
- Size: [Largest lesion measures X mm].
- Signal characteristics: T2/FLAIR hyperintense, T1 iso/hypointense.

JUXTACORTICAL LESIONS:
- Number: [X] lesions.
- Location: [Frontal/Parietal/Temporal/Occipital].
- [U-fiber involvement].

INFRATENTORIAL LESIONS:
- Brainstem: [Present/Absent]. Number: [X].
- Cerebellum: [Present/Absent]. Number: [X].

SPINAL CORD (if imaged):
- Lesions: [Present/Absent].
- Location: [Cervical/Thoracic].
- Cord atrophy: [Present/Absent].

LESION CHARACTERISTICS:
- T2 hyperintensity: [Present].
- T1 "black holes": [Present/Absent]. Number: [X].
- Contrast enhancement: [Present/Absent].
- Enhancement pattern: [Nodular/Ring/Open-ring].
- [Active lesions show enhancement].

DISSEMINATION IN SPACE (DIS) - 2017 McDonald Criteria:
≥2 lesions in typical locations:
- Periventricular: [Yes/No].
- Juxtacortical: [Yes/No].
- Infratentorial: [Yes/No].
- Spinal cord: [Yes/No/Not imaged].
- DIS: [Present/Absent].

DISSEMINATION IN TIME (DIT):
- Simultaneous enhancing and non-enhancing lesions: [Yes/No].
- New T2 lesion compared to prior: [Yes/No/No prior available].
- DIT: [Present/Absent].

BRAIN VOLUME:
- Atrophy: [None/Mild/Moderate/Severe].
- [Brain parenchymal fraction if calculated].

OTHER FINDINGS:
- Ventricles: [Normal/Enlarged].
- Extra-axial spaces: [Normal/Enlarged].
- No mass or mass effect.
- No hemorrhage on SWI.
- MRS (if performed): [Findings].

DIAGNOSTIC ASSESSMENT:
- [Ful/FillNot fulfill] McDonald criteria for MS.
- [Alternative diagnoses to consider if atypical].

IMPRESSION:
1. WHITE MATTER DISEASE:
   - [Number] T2/FLAIR hyperintense lesions in [distribution].
   - [Fulfills/Does not fulfill] DIS criteria.
   - [Fulfills/Does not fulfill] DIT criteria.
2. [Active disease: Enhancing lesions present].
3. [Disease burden: Total lesion load assessment].
4. [Comparison to prior if available].
5. [Other findings].

MS DIAGNOSIS (2017 McDonald Criteria):
- If DIS + DIT + clinical presentation → MS diagnosis
- If criteria not met → Describe findings

RECOMMENDATIONS:
[Follow-up MRI in X months / Clinical correlation / Spinal MRI if not performed / Lumbar puncture if indicated].`,
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'mri,brain,multiple sclerosis,MS,demyelination,white matter,plaques,McDonald',
  },
  {
    title: 'MRI Brain - Tumor Evaluation',
    description: 'MRI brain for tumor evaluation with spectroscopy',
    content: `MRI BRAIN - TUMOR EVALUATION

EXAMINATION: MRI brain with and without contrast, perfusion, and spectroscopy.

CLINICAL INDICATION: [Indication - known tumor, suspected mass, headache, seizure]

TECHNIQUE: Multiplanar multisequence MRI including:
- Sagittal and axial T1, T2, FLAIR
- Axial DWI/ADC, SWI
- Post-contrast T1 in axial, coronal, sagittal planes
- Perfusion weighted imaging (PWI)
- MR spectroscopy (MRS)

COMPARISON: [Previous imaging if available]

FINDINGS:

MASS LESION:

LOCATION:
- Lobe: [Frontal/Parietal/Temporal/Occipital].
- Side: [Right/Left].
- [Supratentorial/Infratentorial].
- [Intra-axial/Extra-axial].
- [Deep gray matter/Corpus callosum involvement].

SIZE:
- Dimensions: [X] x [X] x [X] cm.
- Volume: Approximately [X] mL.

SIGNAL CHARACTERISTICS:
- T1: [Hypointense/Isointense/Hyperintense/Mixed].
- T2: [Hyperintense/Hypointense/Mixed].
- FLAIR: [Hyperintense/Mixed].
- DWI/ADC: [Restricted diffusion/No restriction].

INTERNAL ARCHITECTURE:
- Solid component: [Yes/No].
- Necrosis: [Present/Absent]. Percentage: [X]%.
- Cystic component: [Present/Absent].
- Hemorrhage: [Present/Absent]. Stage: [___].
- Calcification: [Present/Absent].
- Fat: [Present/Absent].

ENHANCEMENT:
- [Non-enhancing/Enhancing].
- Pattern: [Homogeneous/Heterogeneous/Ring/Nodular].
- Wall thickness: [X] mm.
- [Smooth/Irregular] wall.

PERILESIONAL EDEMA:
- Present: [Yes/No].
- Extent: [X] cm from mass margin.
- Mass effect: [None/Mild/Moderate/Severe].

MASS EFFECT:
- Midline shift: [None/X mm].
- Ventricular compression: [None/Present].
- Herniation: [None/Subfalcine/Transtentorial/Tonsillar].

PERFUSION IMAGING (PWI):
- rCBV (relative cerebral blood volume): [Increased/Normal/Decreased].
- [Areas of increased rCBV suggest higher grade].

MR SPECTROSCOPY (MRS):
- Location of voxel: [___].
- NAA (N-acetylaspartate): [Decreased/Normal].
- Choline: [Elevated/Normal].
- Choline/NAA ratio: [X].
- Creatine: [Normal/Decreased].
- Lactate peak: [Present/Absent].
- Lipid peak: [Present/Absent].
- [Elevated choline/NAA ratio suggests high-grade tumor].

DIFFUSION:
- ADC values: [Low/Intermediate/High].
- [Low ADC suggests high cellularity/high-grade tumor].

SWI:
- Intratumoral hemorrhage: [Present/Absent].
- Calcifications: [Present/Absent].
- Susceptibility foci: [Present/Absent].

SPECIFIC TUMOR CONSIDERATIONS:
- Glioblastoma: Ring enhancement, necrosis, high rCBV
- Low-grade glioma: Non-enhancing, high T2, low rCBV
- Metastasis: Well-circumscribed, ring enhancement, multiple
- Lymphoma: Homogeneous enhancement, restricted diffusion
- Meningioma: Extra-axial, dural tail, homogeneous enhancement

IMPRESSION:
1. [INTRACRANIAL MASS]:
   - Location: [___].
   - Size: [X] cm.
   - Enhancement: [Pattern].
   - Associated findings: [Edema, mass effect].
2. IMAGING CHARACTERISTICS SUGGEST:
   - [Differential diagnosis based on imaging features].
   - [WHO Grade estimate if glioma suspected].
3. PERFUSION/SPECTROSCOPY FINDINGS:
   - [Summary of advanced imaging].
4. [Comparison to prior imaging].
5. [Other findings].

RECOMMENDATIONS:
[Stereotactic biopsy / Surgical resection / Short-term follow-up / Additional imaging / Multidisciplinary discussion].`,
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'mri,brain,tumor,glioma,glioblastoma,mass,spectroscopy,perfusion',
  },

  // ========== MRI SPINE ==========
  {
    title: 'MRI Lumbar Spine - Disc Disease',
    description: 'MRI lumbar spine for degenerative disc disease',
    content: `MRI LUMBAR SPINE - DISC DISEASE

EXAMINATION: MRI of the lumbar spine.

CLINICAL INDICATION: [Indication - low back pain, radiculopathy, neurogenic claudication]

TECHNIQUE: Multiplanar multisequence MRI of the lumbar spine including:
- Sagittal T1, T2, STIR
- Axial T1, T2

COMPARISON: [Previous imaging if available]

FINDINGS:

VERTEBRAL ALIGNMENT:
- Lordosis: [Normal/Decreased/Reversed].
- Listhesis: [None/Anterolisthesis/Retrolisthesis].
- Grade: [I/II/III/IV].

VERTEBRAL BODIES:
- Height: [Maintained/Decreased at ___].
- Marrow signal: [Normal/Abnormal].
- Compression fracture: [None/Acute/Chronic at ___].
- Modic changes: [Type I/II/III at ___].

DISCS BY LEVEL:

L1-L2:
- Disc height: [Normal/Decreased].
- Hydration: [Normal/Decreased on T2].
- Disc bulge: [None/Mild/Moderate/Severe].
- Herniation: [None/Protrusion/Extrusion].
- Canal stenosis: [None/Mild/Moderate/Severe].
- Foraminal stenosis: [None/Right/Left/Bilateral].

L2-L3:
- [Similar description].

L3-L4:
- [Similar description].

L4-L5:
- [Similar description].

L5-S1:
- [Similar description].

DISC HERNIATION DETAILS (if present):
- Type: [Protrusion/Extrusion/Sequestration].
- Direction: [Central/Paracentral/Foraminal/Far lateral].
- Size: [X] mm AP dimension.
- Effect on neural elements: [Describe].

SPINAL CANAL:
- Diameter: [Normal AP >12 mm].
- Stenosis: [None/Mild/Moderate/Severe].
- Cause: [Disc/Hypertrophic ligamentum flavum/Facet hypertrophy/Combination].

NEURAL FORAMINA:
- L3-L4: [Patent/Narrowed - Right/Left/Bilateral].
- L4-L5: [Patent/Narrowed - Right/Left/Bilateral].
- L5-S1: [Patent/Narrowed - Right/Left/Bilateral].
- Severity: [Mild/Moderate/Severe].

NERVE ROOTS:
- Cauda equina: [Normal/Displaced/Compressed].
- Exiting nerve roots: [Normal/Compressed].
- [Specific nerve root affected].

FACET JOINTS:
- L3-L4: [Normal/Hypertrophic/Arthropathy - Right/Left].
- L4-L5: [Normal/Hypertrophic/Arthropathy - Right/Left].
- L5-S1: [Normal/Hypertrophic/Arthropathy - Right/Left].
- Joint effusion: [Present/Absent].

LIGAMENTUM FLAVUM:
- [Normal/Hypertrophic].
- Thickness: [X] mm (abnormal if >4 mm).

SPONDYLOLYSIS/SPONDYLOLISTHESIS:
- Pars defect: [None/Right/Left/Bilateral at ___].
- Listhesis: [None/Grade I/II at ___].

CONUS MEDULLARIS:
- Position: [Normal - L1-L2 level/Abnormal].
- Signal: [Normal/Abnormal].

PARASPINAL SOFT TISSUES:
- [Normal/Abnormal].

IMPRESSION:
1. DISC DISEASE:
   - Most significant level: [___].
   - Type: [Bulge/Protrusion/Extrusion].
   - [Canal stenosis grade].
   - [Foraminal stenosis grade].
   - [Nerve root compression].
2. OTHER SIGNIFICANT FINDINGS:
   - [Spondylolisthesis].
   - [Fractures].
   - [Marrow signal abnormality].
3. [Comparison to prior if available].

GRADING STENOSIS:
- Canal: Mild (10-12 mm AP), Moderate (7-10 mm), Severe (<7 mm)
- Foraminal: Mild (<1/3 narrowing), Moderate (1/3-2/3), Severe (>2/3)

RECOMMENDATIONS:
[Conservative management / Physical therapy / Epidural injection consideration / Surgical consultation / Clinical correlation].`,
    categoryName: 'MRI',
    bodyPartName: 'Lumbar Spine',
    modality: 'MRI',
    tags: 'mri,lumbar,spine,disc,herniation,stenosis,radiculopathy,back pain',
  },

  // ========== MRI MSK ==========
  {
    title: 'MRI Knee - Internal Derangement',
    description: 'MRI knee for internal derangement evaluation',
    content: `MRI KNEE - INTERNAL DERANGEMENT

EXAMINATION: MRI of the [right/left] knee.

CLINICAL INDICATION: [Indication - pain, instability, locking, trauma]

TECHNIQUE: Multiplanar multisequence MRI of the knee including:
- Sagittal PD fat-sat, T1, T2
- Coronal PD fat-sat, T1
- Axial PD fat-sat

COMPARISON: [Previous imaging if available]

FINDINGS:

MENISCI:

MEDIAL MENISCUS:
- Anterior horn: [Normal/Abnormal].
- Body: [Normal/Abnormal].
- Posterior horn: [Normal/Abnormal].
- Tear type: [None/Horizontal/Vertical/Complex/Radial/Root/Peripheral].
- Tear location: [Zone: red-red/red-white/white-white].
- Displaced fragment: [None/Present - describe].
- Extrusion: [None/Present - X mm].

LATERAL MENISCUS:
- Anterior horn: [Normal/Abnormal].
- Body: [Normal/Abnormal].
- Posterior horn: [Normal/Abnormal].
- Tear type: [None/Describe].
- Popliteal hiatus: [Normal].

ANTERIOR CRUCIATE LIGAMENT (ACL):
- Continuity: [Intact/Partial tear/Complete tear].
- Signal: [Normal/Increased].
- Orientation: [Normal/Abnormal - vertical/collapsed].
- [Fiber discontinuity: Yes/No].
- Secondary signs: [None/Bone bruise pattern/Anterior tibial translation].

POSTERIOR CRUCIATE LIGAMENT (PCL):
- Continuity: [Intact/Partial tear/Complete tear].
- Signal: [Normal/Increased].

MEDIAL COLLATERAL LIGAMENT (MCL):
- Continuity: [Intact/Grade I/Grade II/Grade III tear].
- Grade I: Periligamentous edema, intact fibers
- Grade II: Partial tear, some fibers disrupted
- Grade III: Complete tear, full-thickness discontinuity
- Thickening: [None/Present].

LATERAL COLLATERAL LIGAMENT (LCL):
- Continuity: [Intact/Tear].
- Popliteus tendon: [Normal/Abnormal].

EXTENSOR MECHANISM:
- Quadriceps tendon: [Normal/Tendinosis/Partial tear/Complete tear].
- Patellar tendon: [Normal/Tendinosis/Partial tear/Complete tear].
- Patella: [Normal/Abnormal].
- Patellar position: [Normal/Alta/Baja].
- Trochlea: [Normal/Dysplastic].

CARTILAGE:
- Medial compartment:
  * Femoral condyle: [Normal/Grade I/II/III/IV defect].
  * Tibial plateau: [Normal/Describe defect].
- Lateral compartment:
  * Femoral condyle: [Normal/Describe defect].
  * Tibial plateau: [Normal/Describe defect].
- Patellofemoral compartment:
  * Patella: [Normal/Describe defect].
  * Trochlea: [Normal/Describe defect].

BONE MARROW:
- Edema: [None/Present].
  * Location: [___].
  * Size: [X] x [X] cm.
- Bone bruises: [None/Present - describe typical pivot shift pattern].
- Fracture: [None/Acute/Subacute/Chronic].
- Osteochondral lesion: [None/Present - describe].
- Osteonecrosis: [None/Present].

JOINT SPACE:
- Effusion: [None/Small/Moderate/Large].
- [Simple/Complex/Hemorrhagic].
- Synovitis: [None/Present].

POPLITEAL FOSSA:
- Baker's cyst: [None/Present]. Size: [X] cm.
- Other masses: [None/Describe].

SOFT TISSUES:
- [Normal/Abnormal].

IMPRESSION:
1. MENISCAL TEARS:
   - [Medial/Lateral] meniscus [zone] tear.
   - [Stable/Unstable] tear pattern.
2. LIGAMENT INJURIES:
   - ACL: [Intact/Partial tear/Complete tear].
   - PCL: [Intact/Abnormal].
   - MCL: [Intact/Grade X].
   - LCL: [Intact/Abnormal].
3. CARTILAGE: [Normal/Defects at ___].
4. BONE: [Normal/Bone bruise/Fracture/Other].
5. [Other significant findings].

RECOMMENDATIONS:
[Orthopedic referral / Physical therapy / Arthroscopy consideration / Clinical correlation].`,
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'mri,knee,ACL,meniscus,cartilage,sports medicine,orthopedic',
  },
  {
    title: 'MRI Shoulder - Rotator Cuff',
    description: 'MRI shoulder for rotator cuff evaluation',
    content: `MRI SHOULDER - ROTATOR CUFF EVALUATION

EXAMINATION: MRI of the [right/left] shoulder.

CLINICAL INDICATION: [Indication - shoulder pain, weakness, impingement, trauma]

TECHNIQUE: Multiplanar multisequence MRI of the shoulder including:
- Coronal oblique T1, T2 fat-sat
- Sagittal oblique T1, T2 fat-sat
- Axial T1, T2 fat-sat

COMPARISON: [Previous imaging if available]

FINDINGS:

ROTATOR CUFF:

SUPRASPINATUS:
- Tendon: [Normal/Tendinosis/Partial tear/Full-thickness tear].
- Tear location: [Anterior/Mid/Substance/Posterior].
- Tear size: AP [X] mm, ML [X] mm.
- Retraction: [None/X cm to ___].
- Muscle belly: [Normal/Fatty infiltration Grade 0-4].
  * Goutallier classification: Grade 0-4

INFRASPINATUS:
- Tendon: [Normal/Tendinosis/Partial tear/Full-thickness tear].
- Muscle: [Normal/Fatty infiltration].

SUBSCAPULARIS:
- Tendon: [Normal/Tendinosis/Partial tear/Full-thickness tear].
- Tear pattern: [Articular/Bursal/Complete].
- Muscle: [Normal/Abnormal].

TERES MINOR:
- Tendon: [Normal/Abnormal].

BICEPS TENDON:
- Long head position: [Normal/Subluxated/Dislocated].
- Long head signal: [Normal/Tendinosis/Partial tear/Complete tear].
- Anchor: [Normal/Abnormal].
- SLAP lesion: [None/Type I-VII].
  * Type II: Separation of superior labrum-biceps anchor
  * Type III: Bucket-handle tear of superior labrum
  * Type IV: Extension into biceps tendon

LABRUM:
- Superior labrum: [Normal/SLAP tear].
- Anterior labrum: [Normal/Bankart tear/ALPSA/GLAD].
- Posterior labrum: [Normal/Reverse Bankart].
- Superior labrum anterior to posterior: [Normal/Tear].

GLENOHUMERAL LIGAMENTS:
- IGHL: [Normal/Tear].
- MGHL: [Normal/Abnormal].
- SGHL: [Normal/Abnormal].

CARTILAGE:
- Humeral head: [Normal/Defect].
- Glenoid: [Normal/Defect].
- [Full-thickness defect at ___].

BONE:
- Humeral head: [Normal/Abnormal].
- Hill-Sachs lesion: [None/Present - describe size].
- Glenoid: [Normal/Abnormal].
- Bony Bankart: [None/Present].
- Bone marrow edema: [None/Present].
- Cysts: [None/Present].

ACROMIOCLAVICULAR JOINT:
- AC joint: [Normal/Degenerative].
- Acromion type: [I/II/III].
- Subacromial spurring: [None/Mild/Moderate/Severe].
- AC joint arthrosis: [None/Present].

SUBACROMIAL SPACE:
- Subacromial bursa: [Normal/Fluid/Bursitis].
- Subacromial impingement: [No/Yes - describe cause].

AXILLARY RECESS AND JOINT:
- Effusion: [None/Small/Moderate/Large].
- Loose bodies: [None/Present].

SOFT TISSUES:
- Deltoid: [Normal/Abnormal].
- Peribursal fat: [Preserved/Obliterated].

IMPRESSION:
1. ROTATOR CUFF:
   - [Supraspinatus/Infraspinatus/Subscapularis] tendon [status].
   - [Full-thickness tear size if present].
   - [Muscle quality].
2. LABRUM: [Normal/Abnormal findings].
3. BICEPS: [Normal/Abnormal].
4. BONE: [Normal/Hill-Sachs/Bony Bankart].
5. IMPINGEMENT: [None/Subacromial/Internal].
6. [Other significant findings].

RECOMMENDATIONS:
[Orthopedic referral / Physical therapy / Surgical consideration / Clinical correlation].`,
    categoryName: 'MRI',
    bodyPartName: 'Upper Extremity',
    modality: 'MRI',
    tags: 'mri,shoulder,rotator cuff,supraspinatus,labrum,SLAP,sports medicine',
  },

  // ========== X-RAY ==========
  {
    title: 'X-Ray Chest - PA and Lateral',
    description: 'Standard chest radiograph interpretation',
    content: `CHEST X-RAY PA AND LATERAL

EXAMINATION: PA and lateral views of the chest.

CLINICAL INDICATION: [Indication - cough, dyspnea, fever, pre-operative]

TECHNIQUE: Standard PA and lateral views obtained.

COMPARISON: [Previous imaging if available]

FINDINGS:

LUNGS:
- Lung volumes: [Normal/Decreased/Hyperinflated].
- Parenchyma: [Clear/Abnormal].
- Consolidation: [None/Present - location ___].
- Nodules/masses: [None/Describe].
- Interstitial markings: [Normal/Increased - diffuse/focal].
- Pleural surfaces: [Normal/Effusion/Pneumothorax].
- Pleural effusion: [None/Small/Moderate/Large - Right/Left].
- Pneumothorax: [None/Present - size X%].

CARDIAC:
- Heart size: [Normal/Enlarged].
- Cardiomediastinal silhouette: [Normal/Widened].
- Cardiothoracic ratio: [X] (normal <0.5).
- Cardiac contours: [Normal/Abnormal].
- Atrial enlargement: [None/Right atrium/Left atrium].
- Ventricular enlargement: [None/Right ventricle/Left ventricle].

MEDIASTINUM:
- Mediastinal width: [Normal/Widened].
- Hilum: [Normal/Enlarged - Right/Left].
- Hilar structures: [Normal/Elevated/Displaced].
- Aortic knob: [Normal/Elongated/Enlarged].

BONES:
- Ribs: [Intact/Fracture - describe].
- Clavicles: [Normal/Fracture].
- Scapulae: [Normal/Abnormal].
- Thoracic spine: [Visible portions normal/Abnormal].
- Destructive lesions: [None/Present].

SOFT TISSUES:
- Neck: [Normal/Subcutaneous emphysema].
- Chest wall: [Normal/Abnormal].
- Below diaphragm: [Normal/Free air].

DIAPHRAGM:
- Position: [Normal/Elevated Right/Left].
- Contour: [Normal/Blunted costophrenic angles].
- Gastric bubble: [Present/Position normal].

TUBES AND LINES:
- [None present / Describe position].

SPECIFIC PATHOLOGY ASSESSMENT:

PNEUMONIA:
- [None/Probable].
- Location: [Lobe/Segment].
- Pattern: [Lobar/Bronchopneumonia/Interstitial].

HEART FAILURE:
- [No evidence/Mild/Moderate/Severe].
- Signs: [Cardiomegaly/Pulmonary venous congestion/Kerley B lines/Pleural effusions].

COPD:
- [No evidence/Mild/Moderate/Severe].
- Signs: [Hyperinflation/Flattened diaphragms/Increased AP diameter/Barrel chest].

IMPRESSION:
1. [Normal chest radiograph].
2. [Abnormal findings]:
   - [Consolidation/Effusion/Cardiomegaly/Nodule/etc.].
   - [Location and size].
3. [Comparison to prior if available].
4. [Recommendations].

RECOMMENDATIONS:
[Clinical correlation / Follow-up chest X-ray in X weeks / CT chest for further evaluation / No follow-up needed].`,
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'xray,chest,PA,lateral,cough,dyspnea,pneumonia,effusion',
  },
  {
    title: 'X-Ray Cervical Spine - Trauma',
    description: 'Cervical spine radiograph for trauma evaluation',
    content: `X-RAY CERVICAL SPINE - TRAUMA

EXAMINATION: Cervical spine radiographs.

CLINICAL INDICATION: [Indication - trauma, neck pain, neurological deficit]

TECHNIQUE: [Views obtained: Lateral, AP, Odontoid, Obliques, Flexion/Extension].

COMPARISON: [Previous imaging if available]

FINDINGS:

ALIGNMENT:
- Cervical lordosis: [Normal/Decreased/Reversed].
- Anterior vertebral line: [Smooth/Step-off at ___].
- Posterior vertebral line: [Smooth/Step-off].
- Spinolaminar line: [Smooth/Step-off].
- Listhesis: [None/Anterolisthesis/Retrolisthesis at ___].

VERTEBRAL BODIES:
- Heights: [Maintained/Decreased at ___].
- Anterior height: [X] mm.
- Posterior height: [X] mm.
- Compression: [None/Wedge/Vertical compression].
- Vertebral body fractures: [None/Describe].
- Soft tissue swelling: [Normal/Increased at level ___].

PREVERTEBRAL SOFT TISSUE:
- C1-C3: [X] mm (normal <7 mm).
- C4-C7: [X] mm (normal <22 mm).
- [Normal/Abnormal widening].

DENS (C2):
- Odontoid process: [Intact/Fracture].
- Fracture type: [Type I - tip / Type II - base / Type III - body].
- Atlantodental interval (ADI): [X] mm (normal <3 mm adults, <5 mm children).

FACET JOINTS:
- Alignment: [Normal/Subluxation/Dislocation/Bilateral jump facets].
- Facet fractures: [None/Describe].

SPINOUS PROCESSES:
- Intact: [Yes/No].
- Fracture: [None/Clay shoveler's fracture at ___].

INTERSPINOUS DISTANCE:
- [Uniform/Widened at ___].
- Suggests ligamentous injury: [Yes/No].

DISC SPACES:
- Heights: [Maintained/Narrowed at ___].
- Prevertebral disc space widening: [None/Present].

LAMINA AND PEDICLES:
- [Intact/Fractured].
- Pedicle fractures: [Hangman's fracture/Traumatic spondylolisthesis].

SOFT TISSUES:
- Paraspinal soft tissues: [Normal/Swollen].
- Trachea: [Midline/Deviated].

OTHER FINDINGS:
- [Additional findings].

TRAUMA ASSESSMENT:
- Cervical spine: [Stable/Unstable].
- Clear: [Yes - no acute fracture or malalignment].
- Indeterminate: [Reason - ___].
- Abnormal: [Describe findings].

IMPRESSION:
1. FRACTURE: [None/Describe].
   - [Vertebral level].
   - [Fracture type].
2. SUBLUXATION/DISLOCATION: [None/Describe].
3. SOFT TISSUE SWELLING: [None/Present].
4. [Stable/Unstable] injury pattern.
5. [Clinical recommendations].

RECOMMENDATIONS:
[CT cervical spine for further evaluation / MRI for ligamentous injury / Clinical correlation / Cervical collar / Neurosurgical consultation].`,
    categoryName: 'X-Ray',
    bodyPartName: 'Cervical Spine',
    modality: 'X-Ray',
    tags: 'xray,cervical spine,trauma,fracture,neck pain,clearance',
  },

  // ========== MAMMOGRAPHY ==========
  {
    title: 'Mammography - Screening BI-RADS',
    description: 'Screening mammogram with BI-RADS assessment',
    content: `SCREENING MAMMOGRAPHY - BI-RADS

EXAMINATION: Bilateral digital mammography [2D / 3D tomosynthesis].

CLINICAL INDICATION: [Screening / Age X years]

TECHNIQUE: Bilateral mammography performed in standard CC and MLO projections. [3D tomosynthesis performed].

COMPARISON: [Previous mammograms: Date X, Location Y]

FINDINGS:

BREAST DENSITY (BI-RADS):
- [A] Almost entirely fatty (<25% glandular)
- [B] Scattered areas of fibroglandular density (25-50%)
- [C] Heterogeneously dense (51-75%) - may obscure small masses
- [D] Extremely dense (>75%) - lowers sensitivity of mammography

RIGHT BREAST:

Masses:
- [None identified].
- [Present]:
  * Location: [Clock face] at [X] cm from nipple.
  * Size: [X] x [X] mm.
  * Shape: [Oval/Round/Irregular].
  * Margin: [Circumscribed/Obscured/Microlobulated/Indistinct/Spiculated].
  * Density: [High density/Equal density/Low density/Fat-containing].

Calcifications:
- [None identified].
- [Present]:
  * Location: [Clock face] at [X] cm from nipple.
  * Distribution: [Diffuse/Regional/Grouped/Linear/Segmental].
  * Morphology: [Typically benign/Coarse heterogeneous/Fine pleomorphic/Fine linear/Amorphous].
  * Typically benign calcifications: [Skin/Vascular/Coarse/popcorn/Large rod-like/Round/Dystrophic/Milk of calcium/Suture].
  * Number: [X] calcifications in group.

Architectural distortion:
- [None identified].
- [Present]: Location [___].

Asymmetries:
- [None].
- [Present]: Type [Asymmetry/Global asymmetry/Focal asymmetry/Developing asymmetry].

LEFT BREAST:
[Similar description as above]

AXILLAE:
- Lymph nodes: [Normal/Abnormal].
- [Enlarged nodes/Suspicious morphology].

SKIN AND NIPPLES:
- [Normal/Abnormal - describe].

CHANGES FROM PRIOR:
- [Stable/New findings/Changed findings].

BI-RADS ASSESSMENT:

RIGHT BREAST: BI-RADS [Category]
LEFT BREAST: BI-RADS [Category]

BI-RADS CATEGORIES:
- Category 0: Incomplete - Need additional imaging evaluation
- Category 1: Negative
- Category 2: Benign finding(s)
- Category 3: Probably benign - Short interval follow-up suggested
- Category 4: Suspicious abnormality - Biopsy should be considered
  * 4A: Low suspicion for malignancy
  * 4B: Moderate suspicion for malignancy
  * 4C: High suspicion for malignancy
- Category 5: Highly suggestive of malignancy - Appropriate action should be taken
- Category 6: Known biopsy-proven malignity

IMPRESSION:
1. RIGHT BREAST: [Finding]. BI-RADS [Category].
2. LEFT BREAST: [Finding]. BI-RADS [Category].
3. [Comparison to prior studies].
4. [Recommendations based on category].

RECOMMENDATIONS:
- BI-RADS 1-2: Annual screening mammography
- BI-RADS 3: Short-interval follow-up in 6 months
- BI-RADS 4: Diagnostic workup and/or biopsy
- BI-RADS 5: Biopsy and appropriate management
- BI-RADS 6: Clinical management as appropriate for known cancer`,
    categoryName: 'Mammography',
    bodyPartName: 'Breast',
    modality: 'Mammography',
    tags: 'mammography,BI-RADS,screening,breast,cancer,calcifications,mass',
  },

  // ========== NUCLEAR MEDICINE ==========
  {
    title: 'PET-CT Whole Body - Oncology',
    description: 'FDG PET-CT for oncologic staging',
    content: `FDG PET-CT WHOLE BODY

EXAMINATION: Whole body FDG PET-CT.

CLINICAL INDICATION: [Indication - staging, restaging, treatment response, known malignancy]

TECHNIQUE: Whole body FDG PET-CT performed from skull base to mid-thigh approximately [X] minutes following intravenous administration of [X] mCi F-18 FDG. Patient fasted for at least 4 hours prior to injection. Blood glucose at time of injection: [X] mg/dL. Low-dose CT performed for anatomic localization and attenuation correction.

COMPARISON: [Previous PET-CT: Date], [Other relevant imaging]

FINDINGS:

BRAIN:
- FDG uptake: [Normal cortical distribution/Abnormal].
- CT findings: [Normal/Abnormal].
- [No suspicious hypermetabolic lesions].

HEAD AND NECK:
- Physiologic uptake: [Tonsils, salivary glands, vocal cords].
- Thyroid: [Normal uptake/Focal uptake at ___].
- Neck nodes: [Normal/FDG avid nodes at ___].
- SUVmax: [X].

THORAX:
Lungs:
- Pulmonary nodules/masses: [None/FDG avid lesion at ___].
- Size: [X] cm.
- SUVmax: [X].
- [Non-FDG avid nodules: Describe].

Mediastinum:
- Lymph nodes: [None/FDG avid nodes - station, size, SUVmax].
- Thymus: [Normal/Abnormal].

Pleura:
- [Normal/Effusion/Nodular thickening with FDG avidity].

Heart:
- Myocardial uptake: [Present/Absent - fasting state].

Breast:
- [Normal/FDG avid mass - size, SUVmax].

ABDOMEN:
Liver:
- [Normal/FDG avid lesions - size, SUVmax].
- [Non-FDG avid lesions].

Adrenals:
- [Normal/Bilateral/unilateral FDG avid nodule].
- Size: [X] cm. SUVmax: [X].

Pancreas:
- [Normal/FDG avid mass].
- Size: [X] cm. SUVmax: [X].

Gastrointestinal tract:
- Stomach: [Normal/Abnormal].
- Bowel: [Physiologic uptake/FDG avid mass/stricture].
- SUVmax: [X].

PELVIS:
Bladder:
- [Normal/Diverticulum/Mass - describe SUV].

Reproductive organs:
- [Male/Female findings].
- Prostate/Uterus/Ovaries: [Normal/Abnormal].

MUSCULOSKELETAL:
Bones:
- [Normal/FDG avid osseous lesions].
- Location: [___].
- CT correlate: [Lytic/Blastic/Mixed/Normal].
- Number of lesions: [Solitary/Multiple].

Soft tissues:
- [Normal/Abnormal].

QUANTITATIVE ANALYSIS:
- Liver SUVmean: [X], SUVmax: [X] (reference).
- Blood pool SUVmax: [X] (mediastinal reference).
- Lesion SUVmax values: As noted above.

TREATMENT RESPONSE (if applicable):
- [Complete metabolic response/Partial metabolic response/Stable metabolic disease/Progressive metabolic disease].
- PERCIST criteria: [Response assessment].
- Deauville score (lymphoma): [1-5].

INCIDENTAL FINDINGS:
- [Describe significant non-oncologic findings].

IMPRESSION:
1. ONCOLOGIC FINDINGS:
   - [Primary tumor status].
   - [Regional lymph nodes].
   - [Distant metastases].
   - TNM staging: [Stage].
2. TREATMENT RESPONSE:
   - [Response category].
3. INCIDENTAL FINDINGS:
   - [List significant non-oncologic findings].
4. [Comparison to prior studies].

RECOMMENDATIONS:
[Follow-up imaging / Clinical correlation / Biopsy of accessible lesion / Multidisciplinary discussion].`,
    categoryName: 'Nuclear Medicine',
    bodyPartName: 'Whole Body',
    modality: 'PET',
    tags: 'PET-CT,FDG,oncology,staging,SUV,metabolic,treatment response',
  },
  {
    title: 'Bone Scan Whole Body',
    description: 'Whole body bone scintigraphy',
    content: `BONE SCAN WHOLE BODY

EXAMINATION: Whole body bone scintigraphy.

CLINICAL INDICATION: [Indication - metastatic screening, bone pain, prosthesis evaluation, stress fracture]

TECHNIQUE: Whole body bone scintigraphy performed approximately [X] hours following intravenous administration of [X] mCi Tc-99m MDP. Multiple static and whole body images obtained.

COMPARISON: [Previous bone scan: Date], [Other imaging]

FINDINGS:

WHOLE BODY SURVEY:
- Overall pattern: [Normal physiologic distribution/Metastatic pattern/Superscan].

SKULL AND CALVARIUM:
- [Normal/Abnormal uptake at ___].
- Focal/Diffuse: [Describe].

CERVICAL SPINE:
- [Normal/Abnormal - focal uptake at ___].

THORACIC SPINE:
- [Normal/Abnormal - focal uptake at ___].
- [Pattern: Single/Multiple contiguous/Multiple noncontiguous].

LUMBAR SPINE:
- [Normal/Abnormal - focal uptake at ___].
- [Facet uptake/Vertebral body uptake].

SACRUM AND SI JOINTS:
- SI joints: [Normal/Increased uptake bilaterally/unilaterally].
- Sacrum: [Normal/Insufficiency fracture pattern - Honda sign].

RIBS:
- [Normal/Focal uptake].
- Pattern: [Single/Multiple/Trauma pattern/Metastatic pattern].
- [Linear uptake suggesting fracture vs focal suggesting metastasis].

STERNUM AND CLAVICLES:
- [Normal/Abnormal].

SHOULDERS AND HUMERI:
- [Normal/Abnormal].

FOREARMS AND HANDS:
- [Normal/Abnormal].

PELVIS:
- [Normal/Abnormal].
- Pubic symphysis: [Normal/Abnormal].
- Acetabuli: [Normal/Abnormal].

FEMORA:
- [Normal/Abnormal].
- [Focal uptake at femoral neck suggesting fracture/AVD].

KNEES:
- [Normal/Abnormal].

LOWER LEGS AND FEET:
- [Normal/Abnormal].
- [Stress fracture pattern at ___].

SOFT TISSUE UPTAKE:
- [None/Present].
- Location: [___].
- [Renal uptake: Normal/Increased/Absent].
- [Urinary tract: Normal/Hydronephrosis/Retention].

SPECIFIC LESIONS:
Lesion 1:
- Location: [___].
- Intensity: [Mild/Moderate/Intense].
- CT correlate: [If available, describe lytic/blastic/normal].
- Likely etiology: [Metastatic/Traumatic/Degenerative/Inflammatory].

Lesion 2:
- [Describe].

METASTATIC PATTERN:
- [No evidence of osseous metastatic disease].
- [Multiple focal lesions consistent with osseous metastases].
- [Distribution: Axial predominance/Appendicular involvement].
- [Superscan pattern: Diffuse metastatic disease].

BENIGN PATTERNS:
- Degenerative changes: [Facet arthropathy, DJD at joints].
- Fractures: [Rib fractures - pattern, vertebral compression].
- Inflammatory: [SI joints, entheses].

IMPRESSION:
1. [No evidence of osseous metastatic disease].
2. [Abnormal findings]:
   - [Number of abnormal foci].
   - [Distribution pattern].
   - [Suspicious for: Metastatic disease/Benign etiology].
3. [Benign findings]:
   - [Degenerative changes/Fractures/Arthritis].
4. [Comparison to prior if available].

RECOMMENDATIONS:
[Correlative CT/MRI if indicated / Follow-up bone scan in X months / Clinical correlation].`,
    categoryName: 'Nuclear Medicine',
    bodyPartName: 'Whole Body',
    modality: 'Nuclear Medicine',
    tags: 'bone scan,metastasis,skeletal,oncology,fracture,MDP,scintigraphy',
  },
]

// ============================================
// COMPREHENSIVE SNIPPETS
// ============================================
const snippets = [
  // ========== NORMAL/NEGATIVE FINDINGS ==========
  {
    title: 'Normal Brain Parenchyma',
    description: 'Normal brain parenchyma description',
    content: 'The brain parenchyma demonstrates normal gray-white differentiation. No acute intracranial abnormality. No mass, mass effect, or midline shift. Ventricles and sulci are normal in size and configuration.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'normal,brain,parenchyma,negative,unremarkable',
  },
  {
    title: 'No Acute Intracranial Hemorrhage',
    description: 'Negative hemorrhage assessment',
    content: 'No acute intracranial hemorrhage identified. No evidence of extra-axial collection. No subdural or epidural hematoma. No subarachnoid hemorrhage.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'hemorrhage,negative,SDH,EDH,SAH,bleed',
  },
  {
    title: 'No Acute Infarct - DWI',
    description: 'Negative stroke on MRI',
    content: 'No restricted diffusion on DWI to suggest acute infarction. No DWI/ADC mismatch identified.',
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'infarct,stroke,DWI,restricted diffusion,negative',
  },
  {
    title: 'No Pulmonary Embolism',
    description: 'Negative PE on CTPA',
    content: 'No pulmonary embolism identified. The pulmonary arteries demonstrate normal opacification without filling defect. Right ventricular size is normal.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'PE,pulmonary embolism,negative,CTPA',
  },
  {
    title: 'No Pneumothorax',
    description: 'Negative pneumothorax',
    content: 'No pneumothorax identified. The lungs are fully expanded. No pleural air identified.',
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'pneumothorax,PTX,negative,lung',
  },
  {
    title: 'No Free Air Under Diaphragm',
    description: 'Negative pneumoperitoneum',
    content: 'No free intraperitoneal air identified. No pneumoperitoneum. The diaphragmatic contours are normal.',
    categoryName: 'X-Ray',
    bodyPartName: 'Abdomen',
    modality: 'X-Ray',
    tags: 'pneumoperitoneum,free air,perforation',
  },
  {
    title: 'No Fracture Identified',
    description: 'Negative fracture assessment',
    content: 'No acute fracture identified. Cortical margins are intact. No displaced or non-displaced fracture.',
    categoryName: 'X-Ray',
    modality: 'X-Ray',
    tags: 'fracture,negative,trauma,bone',
  },
  {
    title: 'Normal Cardiac Silhouette',
    description: 'Normal heart size on chest X-ray',
    content: 'The cardiomediastinal silhouette is within normal limits. Cardiothoracic ratio is within normal limits. No cardiomegaly.',
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'cardiac,heart,cardiomegaly,normal,CT ratio',
  },
  {
    title: 'Clear Lung Fields',
    description: 'Normal lungs on chest X-ray',
    content: 'The lungs are clear. No focal consolidation, pleural effusion, or pneumothorax identified. No pulmonary edema.',
    categoryName: 'X-Ray',
    bodyPartName: 'Chest/Thorax',
    modality: 'X-Ray',
    tags: 'lungs,clear,normal,negative',
  },
  {
    title: 'No Pleural Effusion',
    description: 'Negative pleural effusion',
    content: 'No pleural effusion identified. The costophrenic angles are clear. No pleural fluid.',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'pleural,effusion,negative',
  },

  // ========== HEMORRHAGE FINDINGS ==========
  {
    title: 'Acute Subdural Hematoma',
    description: 'Description of acute SDH',
    content: 'Acute subdural hematoma identified [right/left], appearing as a crescent-shaped hyperdense extra-axial collection. Thickness measures [X] mm. Associated mass effect with [X] mm midline shift. Underlying brain parenchyma [compressed/normal].',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'SDH,subdural,hematoma,acute,hyperdense',
  },
  {
    title: 'Acute Epidural Hematoma',
    description: 'Description of acute EDH',
    content: 'Acute epidural hematoma identified [right/left], appearing as a lentiform/biconvex hyperdense extra-axial collection. Associated with skull fracture. Mass effect noted with [X] mm midline shift.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'EDH,epidural,hematoma,lentiform,biconvex',
  },
  {
    title: 'Subarachnoid Hemorrhage',
    description: 'SAH description',
    content: 'Subarachnoid hemorrhage identified with hyperdense blood within the [basal cisterns/Sylvian fissures/interhemispheric fissure/convexity sulci]. Distribution suggests [aneurysm location if pattern is typical].',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'SAH,subarachnoid,hemorrhage,aneurysm',
  },
  {
    title: 'Intraparenchymal Hemorrhage - Hypertensive',
    description: 'Typical hypertensive hemorrhage',
    content: 'Intraparenchymal hemorrhage in the [basal ganglia/thalamus/pons/cerebellum], typical location for hypertensive hemorrhage. Size approximately [X] mL. [With/Without] intraventricular extension. Surrounding vasogenic edema. Mass effect with [X] mm midline shift.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'ICH,hemorrhage,hypertensive,basal ganglia',
  },

  // ========== INFARCT FINDINGS ==========
  {
    title: 'Acute MCA Territory Infarct',
    description: 'MCA stroke description',
    content: 'Acute infarction in the [right/left] middle cerebral artery territory. Findings include: loss of gray-white differentiation, subtle hypodensity, loss of insular ribbon, obscuration of lentiform nucleus. ASPECTS score: [X]/10.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'infarct,stroke,MCA,ASPECTS,acute',
  },
  {
    title: 'Dense MCA Sign',
    description: 'Hyperdense MCA indicating thrombus',
    content: 'Hyperdense [right/left] middle cerebral artery (M1 segment) identified, consistent with acute thrombus. Correlates with clinical presentation of acute stroke.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'dense MCA,thrombus,stroke,MCA',
  },
  {
    title: 'Lacunar Infarct',
    description: 'Small vessel infarct description',
    content: 'Lacunar infarct identified in the [basal ganglia/thalamus/internal capsule/pons/cerebellum], measuring [X] mm, consistent with small vessel disease.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'lacunar,lacune,small vessel,infarct',
  },
  {
    title: 'Chronic Infarct - Encephalomalacia',
    description: 'Old infarct description',
    content: 'Chronic infarct with encephalomalacia and gliosis in the [territory/region], consistent with remote infarction. Associated volume loss and ex vacuo dilatation of adjacent ventricle.',
    categoryName: 'MRI',
    bodyPartName: 'Head/Brain',
    modality: 'MRI',
    tags: 'chronic,infarct,encephalomalacia,old stroke',
  },

  // ========== DISC/SPINE FINDINGS ==========
  {
    title: 'Disc Herniation - Protrusion',
    description: 'Disc protrusion description',
    content: 'Disc protrusion at [level], [central/paracentral/foraminal/far lateral] in location, measuring [X] mm in AP dimension. [Abutting/compressing] the thecal sac [and traversing nerve root].',
    categoryName: 'MRI',
    bodyPartName: 'Lumbar Spine',
    modality: 'MRI',
    tags: 'disc,herniation,protrusion,spine',
  },
  {
    title: 'Disc Herniation - Extrusion',
    description: 'Disc extrusion description',
    content: 'Disc extrusion at [level], with disc material extending beyond the disc space. Migrated fragment seen [superiorly/inferiorly], measuring [X] mm. [Compressing/displacing] the [thecal sac/nerve root].',
    categoryName: 'MRI',
    bodyPartName: 'Lumbar Spine',
    modality: 'MRI',
    tags: 'disc,extrusion,herniation,migrated,sequestration',
  },
  {
    title: 'Canal Stenosis - Moderate',
    description: 'Spinal canal stenosis description',
    content: 'Moderate spinal canal stenosis at [level]. AP diameter reduced to [X] mm (normal >12 mm). Caused by [disc bulge/facet hypertrophy/ligamentum flavum thickening]. Thecal sac compressed.',
    categoryName: 'MRI',
    bodyPartName: 'Lumbar Spine',
    modality: 'MRI',
    tags: 'stenosis,canal,spine,narrowing',
  },
  {
    title: 'Neural Foraminal Stenosis',
    description: 'Foraminal narrowing description',
    content: '[Mild/Moderate/Severe] [right/left] neural foraminal stenosis at [level]. Caused by [disc protrusion/facet hypertrophy/uncovertebral hypertrophy]. Perineural fat obliterated. [Exiting nerve root compressed].',
    categoryName: 'MRI',
    bodyPartName: 'Lumbar Spine',
    modality: 'MRI',
    tags: 'foraminal,stenosis,nerve root,foramen',
  },

  // ========== MENISCUS/LIGAMENT FINDINGS ==========
  {
    title: 'Meniscal Tear - Horizontal',
    description: 'Horizontal meniscal tear',
    content: 'Horizontal tear of the [medial/lateral] meniscus [anterior horn/body/posterior horn], extending to the [superior/inferior] articular surface. [Stable/Unstable] tear pattern.',
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'meniscus,tear,horizontal,knee',
  },
  {
    title: 'ACL Complete Tear',
    description: 'Complete ACL tear description',
    content: 'Complete tear of the anterior cruciate ligament. No intact fibers identified. [Associated with] bone contusion pattern involving the lateral femoral condyle and posterior lateral tibial plateau.',
    categoryName: 'MRI',
    bodyPartName: 'Lower Extremity',
    modality: 'MRI',
    tags: 'ACL,tear,complete,knee,sports',
  },
  {
    title: 'Rotator Cuff Full-Thickness Tear',
    description: 'Full-thickness rotator cuff tear',
    content: 'Full-thickness tear of the [supraspinatus/infraspinatus/subscapularis] tendon. Tear measures [X] mm in AP dimension and [X] mm in medial-lateral dimension. [Tendon retracted X cm]. [Muscle shows Grade X fatty infiltration].',
    categoryName: 'MRI',
    bodyPartName: 'Upper Extremity',
    modality: 'MRI',
    tags: 'rotator cuff,tear,supraspinatus,shoulder',
  },

  // ========== RECOMMENDATION PHRASES ==========
  {
    title: 'Recommend Clinical Correlation',
    description: 'Standard recommendation',
    content: 'Recommend clinical correlation. Correlation with clinical symptoms and physical examination findings is advised.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,clinical,correlation',
  },
  {
    title: 'Recommend Follow-up CT',
    description: 'CT follow-up recommendation',
    content: 'Recommend follow-up CT in [X] weeks to reassess [finding].',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,follow-up,CT',
  },
  {
    title: 'Recommend MRI for Further Evaluation',
    description: 'MRI recommendation',
    content: 'Recommend MRI for further evaluation given the limitations of CT in evaluating [area/pathology].',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,MRI,further evaluation',
  },
  {
    title: 'Recommend Short-Term Follow-up',
    description: 'Short-term imaging recommendation',
    content: 'Recommend short-term follow-up imaging in [X] weeks to ensure stability/resolution.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'recommendation,follow-up,short-term',
  },
  {
    title: 'Stable Compared to Prior',
    description: 'Comparison with prior study',
    content: 'Findings are stable compared to prior examination dated [date]. No significant interval change.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'stable,comparison,prior,no change',
  },
  {
    title: 'New Compared to Prior',
    description: 'New finding compared to prior',
    content: 'This finding is new compared to prior examination dated [date].',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'new,comparison,prior,interval change',
  },
  {
    title: 'Fleischner Society Recommendations - Lung Nodule',
    description: 'Lung nodule follow-up per Fleischner guidelines',
    content: 'Per Fleischner Society guidelines, [low-risk/high-risk] patient with [solid/subsolid] nodule measuring [X] mm: Recommend [follow-up CT at X months / no follow-up needed / 12-month follow-up].',
    categoryName: 'CT',
    bodyPartName: 'Chest/Thorax',
    modality: 'CT',
    tags: 'Fleischner,nodule,follow-up,lung',
  },

  // ========== MEASUREMENT STANDARDS ==========
  {
    title: 'Normal Ventricular Size',
    description: 'Normal ventricles assessment',
    content: 'Ventricles are normal in size and configuration. No hydrocephalus. No ventriculomegaly. No transependymal edema.',
    categoryName: 'CT',
    bodyPartName: 'Head/Brain',
    modality: 'CT',
    tags: 'ventricles,normal,hydrocephalus',
  },
  {
    title: 'Normal Aorta Diameter',
    description: 'Normal aortic size',
    content: 'The [ascending/descending abdominal] aorta measures [X] cm in diameter (normal <3.0 cm ascending, <2.5 cm abdominal). No aneurysm.',
    categoryName: 'CT',
    bodyPartName: 'Vascular',
    modality: 'CT',
    tags: 'aorta,normal,aneurysm,diameter',
  },
  {
    title: 'Normal Liver Size',
    description: 'Normal hepatic size',
    content: 'The liver is normal in size, measuring approximately [X] cm in span at the midclavicular line (normal up to 15 cm).',
    categoryName: 'Ultrasound',
    bodyPartName: 'Liver',
    modality: 'USG',
    tags: 'liver,size,normal,span',
  },
  {
    title: 'Normal CBD Diameter',
    description: 'Normal common bile duct',
    content: 'The common bile duct measures [X] mm in diameter (normal up to 6 mm, +1 mm per decade after age 50).',
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'USG',
    tags: 'CBD,bile duct,normal,diameter',
  },
  {
    title: 'Normal Spleen Size',
    description: 'Normal splenic size',
    content: 'The spleen measures [X] cm in length (normal up to 12 cm). Normal splenic size and echotexture. No splenomegaly.',
    categoryName: 'Ultrasound',
    bodyPartName: 'Abdomen',
    modality: 'USG',
    tags: 'spleen,size,normal,splenomegaly',
  },

  // ========== TI-RADS / BI-RADS ==========
  {
    title: 'TI-RADS Categories Reference',
    description: 'TI-RADS classification reference',
    content: 'TI-RADS Classification:\n• TR1 (Benign): No FNA needed\n• TR2 (Not Suspicious): No FNA needed\n• TR3 (Mildly Suspicious): FNA if ≥2.5cm\n• TR4 (Moderately Suspicious): FNA if ≥1.5cm\n• TR5 (Highly Suspicious): FNA if ≥1.0cm',
    categoryName: 'Ultrasound',
    bodyPartName: 'Thyroid',
    modality: 'USG',
    tags: 'TI-RADS,thyroid,nodule,FNA,classification',
  },
  {
    title: 'BI-RADS Categories Reference',
    description: 'BI-RADS classification reference',
    content: 'BI-RADS Classification:\n• Category 1: Negative - Routine screening\n• Category 2: Benign - Routine screening\n• Category 3: Probably Benign - 6-month follow-up\n• Category 4: Suspicious - Biopsy recommended\n• Category 5: Highly Suspicious - Biopsy and action\n• Category 6: Known malignancy',
    categoryName: 'Mammography',
    bodyPartName: 'Breast',
    modality: 'Mammography',
    tags: 'BI-RADS,breast,mammography,classification',
  },

  // ========== COMPARISON PHRASES ==========
  {
    title: 'Interval Resolution',
    description: 'Finding has resolved',
    content: 'Interval resolution of the previously seen [finding]. No residual [abnormality] identified.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'resolution,interval,resolved,prior',
  },
  {
    title: 'Interval Decrease',
    description: 'Finding has improved',
    content: 'Interval decrease in the size of [finding]. Previously measured [X] cm, now measures [X] cm. [Percentage] reduction.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'decrease,interval,improved,response',
  },
  {
    title: 'Interval Increase',
    description: 'Finding has worsened',
    content: 'Interval increase in the size of [finding]. Previously measured [X] cm, now measures [X] cm. [Percentage] increase.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'increase,interval,progression,worsening',
  },
  {
    title: 'No Prior Comparison Available',
    description: 'No prior study for comparison',
    content: 'No prior imaging available for comparison. Recommend comparison with prior studies when available.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'comparison,prior,unavailable,no prior',
  },

  // ========== TECHNIQUE PHRASES ==========
  {
    title: 'CT Technique - Standard',
    description: 'Standard CT technique description',
    content: 'Axial images were obtained through the [region] following administration of [X] mL of intravenous iodinated contrast. Images were reviewed in axial, coronal, and sagittal planes.',
    categoryName: 'CT',
    modality: 'CT',
    tags: 'technique,CT,standard,contrast',
  },
  {
    title: 'MRI Technique - Standard',
    description: 'Standard MRI technique description',
    content: 'Multiplanar multisequence MRI of the [region] was performed including T1-weighted, T2-weighted, and [additional sequences] sequences. [Post-contrast sequences obtained following administration of gadolinium-based contrast].',
    categoryName: 'MRI',
    modality: 'MRI',
    tags: 'technique,MRI,standard,sequences',
  },
  {
    title: 'USG Technique - Standard',
    description: 'Standard ultrasound technique',
    content: 'Real-time grayscale and color Doppler ultrasound examination of the [region] was performed using [curvilinear/linear/high-frequency] transducer.',
    categoryName: 'Ultrasound',
    modality: 'USG',
    tags: 'technique,ultrasound,standard,Doppler',
  },
]

async function main() {
  console.log('Starting comprehensive seed...')

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
  let templateCount = 0
  for (const template of templates) {
    const category = template.categoryName
      ? await prisma.category.findUnique({ where: { name: template.categoryName } })
      : null
    const bodyPart = template.bodyPartName
      ? await prisma.bodyPart.findUnique({ where: { name: template.bodyPartName } })
      : null

    try {
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
      templateCount++
    } catch (error) {
      console.log(`Template already exists: ${template.title}`)
    }
  }

  // Create snippets
  console.log('Creating snippets...')
  let snippetCount = 0
  for (const snippet of snippets) {
    const category = snippet.categoryName
      ? await prisma.category.findUnique({ where: { name: snippet.categoryName } })
      : null
    const bodyPart = snippet.bodyPartName
      ? await prisma.bodyPart.findUnique({ where: { name: snippet.bodyPartName } })
      : null

    try {
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
      snippetCount++
    } catch (error) {
      console.log(`Snippet already exists: ${snippet.title}`)
    }
  }

  console.log('\n========================================')
  console.log('COMPREHENSIVE SEED COMPLETED!')
  console.log('========================================')
  console.log(`Categories: ${categories.length}`)
  console.log(`Body Parts: ${bodyParts.length}`)
  console.log(`Templates created: ${templateCount}`)
  console.log(`Snippets created: ${snippetCount}`)
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
