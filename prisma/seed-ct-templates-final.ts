import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templates = [
  {
    "title": "Plain CT Brain",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "Non-contrast CT of the brain",
    "modality": "CT",
    "tags": "brain,neurology,plain ct,non-contrast,head",
    "content": "PLAIN CT BRAIN - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nTECHNIQUE: Non-contrast computed tomography of the brain was performed without intravenous contrast.\n\nFINDINGS:\nBrain Parenchyma: Normal attenuation. No focal lesion. No acute infarction or hemorrhage.\nVentricles and Cisterns: Normal size. No hydrocephalus. Basal cisterns patent.\nExtra-axial Spaces: No extra-axial collection or mass effect.\nCalvarium: No acute fracture or lytic lesion.\n\nIMPRESSION: No acute intracranial abnormality."
  },
  {
    "title": "CECT Brain",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "Contrast-enhanced CT of the brain",
    "modality": "CT",
    "tags": "brain,neurology,contrast,cect",
    "content": "CONTRAST-ENHANCED CT BRAIN - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nTECHNIQUE: Contrast-enhanced CT brain performed following IV contrast.\n\nFINDINGS:\nBrain Parenchyma: Normal attenuation. No abnormal enhancement. No mass lesion.\nVentricles: Normal size and configuration. No midline shift.\nVascular: No vascular abnormality. Normal enhancement of major vessels.\n\nIMPRESSION: No enhancing intracranial lesion. Unremarkable CECT brain."
  },
  {
    "title": "Stroke Protocol CT",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "CT stroke protocol with CTA and perfusion",
    "modality": "CT",
    "tags": "stroke,emergency,cta,perfusion,acute",
    "content": "CT STROKE PROTOCOL - REPORT\n\nCLINICAL INDICATION: [Indication - suspected acute stroke]\n\nTECHNIQUE: Non-contrast CT brain, CT Angiography head and neck, CT Perfusion.\n\nNON-CONTRAST CT:\nASPECTS Score: [X]/10\nNo hyperdense MCA sign. No intracranial hemorrhage.\n\nCT ANGIOGRAPHY:\nRight ICA: [patent/stenosis/occlusion]\nLeft ICA: [patent/stenosis/occlusion]\nMCA: [patent/stenosis/occlusion]\nBasilar: [patent/stenosis/occlusion]\n\nCT PERFUSION:\nCBF: [findings] | CBV: [findings] | MTT: [findings]\n\nIMPRESSION: [Acute/No acute] intracranial abnormality. [Vessel status]."
  },
  {
    "title": "Trauma Brain CT",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "CT brain for trauma evaluation",
    "modality": "CT",
    "tags": "trauma,emergency,head injury,fracture",
    "content": "CT BRAIN FOR TRAUMA - REPORT\n\nCLINICAL INDICATION: [Indication - head trauma]\n\nFINDINGS:\nINTRACRANIAL:\n- No epidural hematoma\n- No subdural hematoma  \n- No subarachnoid hemorrhage\n- No parenchymal contusion\n- No midline shift\n- Basal cisterns patent\n\nSKULL: No fracture identified.\n\nIMPRESSION: No acute traumatic intracranial abnormality."
  },
  {
    "title": "Hydrocephalus CT",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "CT evaluation of hydrocephalus",
    "modality": "CT",
    "tags": "hydrocephalus,ventricles,shunt,neurology",
    "content": "CT BRAIN - HYDROCEPHALUS EVALUATION\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nVENTRICULAR SYSTEM:\n- Lateral ventricles: [normal/enlarged]\n- Third ventricle: [normal/enlarged]\n- Fourth ventricle: [normal/enlarged]\nEVANS INDEX: [measurement]\n\nTransependymal edema: [present/absent]\n\nSHUNT (if applicable): Catheter position [location]. Malfunction [yes/no].\n\nIMPRESSION: [Communicating/Non-communicating] hydrocephalus."
  },
  {
    "title": "Brain Tumor CT",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "CT evaluation of brain tumors",
    "modality": "CT",
    "tags": "tumor,neoplasm,oncology,mass lesion",
    "content": "CT BRAIN - TUMOR EVALUATION\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPRIMARY LESION:\n- Location: [lobe/deep structures/posterior fossa]\n- Size: [measurements]\n- Morphology: [well-circumscribed/ill-defined]\n- Attenuation: [hypo/isodense/hyperdense]\n- Enhancement: [none/homogeneous/heterogeneous/ring]\n- Surrounding edema: [present/absent]\n- Mass effect: [present/absent]\n\nIMPRESSION: [Description of lesion]. [Differential diagnosis]."
  },
  {
    "title": "Sinus Associated Findings CT",
    "category": "CT Brain",
    "bodyPart": "Brain",
    "description": "CT with paranasal sinus evaluation",
    "modality": "CT",
    "tags": "sinus,pns,paranasal,inflammatory,ent",
    "content": "CT BRAIN WITH PARANASAL SINUS EVALUATION\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBRAIN PARENCHYMA: Normal. No acute infarction or hemorrhage.\n\nPARANASAL SINUSES:\n- Maxillary: [clear/mucosal thickening/fluid]\n- Frontal: [clear/mucosal thickening]\n- Ethmoid: [clear/mucosal thickening]\n- Sphenoid: [clear/mucosal thickening]\n\nOSTIOMEATAL COMPLEX: Right [patent/obstructed], Left [patent/obstructed]\n\nIMPRESSION: [Brain findings]. [Sinus findings]."
  },
  {
    "title": "CT Face",
    "category": "CT Head & Neck",
    "bodyPart": "Head & Neck",
    "description": "CT of facial bones and soft tissues",
    "modality": "CT",
    "tags": "face,trauma,fracture,orbital,mandible",
    "content": "CT FACE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nFACIAL BONES:\n- Maxilla: [intact/fracture]\n- Zygoma: [intact/fracture]\n- Nasal bones: [intact/fracture]\n- Orbital walls: [intact/fracture]\n- Mandible: [intact/fracture]\n\nORBITS: Globe position [normal]. Extraocular muscles [normal].\n\nSINUSES: [clear/mucosal thickening/hematosinus]\n\nIMPRESSION: [Fracture status]. [Orbital involvement]."
  },
  {
    "title": "CT Orbit",
    "category": "CT Head & Neck",
    "bodyPart": "Head & Neck",
    "description": "Dedicated CT of the orbits",
    "modality": "CT",
    "tags": "orbit,eye,orbital,globe,optic nerve",
    "content": "CT ORBIT - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nRIGHT ORBIT: Globe [normal]. Optic nerve [normal]. Extraocular muscles [normal]. Orbital walls [intact].\nLEFT ORBIT: Globe [normal]. Optic nerve [normal]. Extraocular muscles [normal]. Orbital walls [intact].\nORBITAL APEX: Optic canal [normal]. Superior orbital fissure [normal].\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT PNS (Paranasal Sinuses)",
    "category": "CT Head & Neck",
    "bodyPart": "Head & Neck",
    "description": "CT of paranasal sinuses",
    "modality": "CT",
    "tags": "sinus,pns,paranasal,sinusitis,ent",
    "content": "CT PARANASAL SINUSES - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nMAXILLARY: Right [clear/disease], Left [clear/disease]\nFRONTAL: Right [clear/disease], Left [clear/disease]\nETHMOID: [clear/disease]\nSPHENOID: [clear/disease]\n\nOSTIOMEATAL COMPLEX: Right [patent/obstructed], Left [patent/obstructed]\nNASAL SEPTUM: [midline/deviated]\n\nANATOMIC VARIATIONS: Concha bullosa [present/absent]. Haller cells [present/absent].\n\nIMPRESSION: [Sinus disease status]. [Anatomic variations]."
  },
  {
    "title": "CT Temporal Bone",
    "category": "CT Head & Neck",
    "bodyPart": "Head & Neck",
    "description": "High-resolution CT of temporal bones",
    "modality": "CT",
    "tags": "temporal bone,ear,hearing,cholesteatoma,mastoid",
    "content": "CT TEMPORAL BONE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nRIGHT:\n- External auditory canal: [normal]\n- Middle ear: [clear/soft tissue]\n- Ossicles: [intact/erosion]\n- Mastoid: [well-pneumatized/disease]\n- Inner ear: [normal]\n\nLEFT:\n- External auditory canal: [normal]\n- Middle ear: [clear/soft tissue]\n- Ossicles: [intact/erosion]\n- Mastoid: [well-pneumatized/disease]\n- Inner ear: [normal]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Neck",
    "category": "CT Head & Neck",
    "bodyPart": "Head & Neck",
    "description": "CT of neck soft tissues",
    "modality": "CT",
    "tags": "neck,thyroid,lymph nodes,parotid,larynx",
    "content": "CT NECK - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nTHYROID: Size [normal/enlarged]. Nodules [present/absent].\nLYMPH NODES: Level I-VII [normal/enlarged].\nCAROTIDS: [normal/stenosis].\nJUGULAR VEINS: [patent/thrombosed].\nSALIVARY GLANDS: Parotid [normal], Submandibular [normal].\nPHARYNX/LARYNX: [normal/abnormal].\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Angiography Head Neck",
    "category": "CT Head & Neck",
    "bodyPart": "Head & Neck",
    "description": "CTA of head and neck vessels",
    "modality": "CT",
    "tags": "cta,angiography,carotid,vertebral,stroke",
    "content": "CT ANGIOGRAPHY HEAD AND NECK - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nCAROTID ARTERIES:\n- Right CCA: [patent/stenosis]\n- Left CCA: [patent/stenosis]\n- Right ICA: [patent/stenosis/occlusion] - NASCET [%]\n- Left ICA: [patent/stenosis/occlusion] - NASCET [%]\n\nVERTEBRAL ARTERIES: Right [normal], Left [normal]\nINTRACRANIAL: Basilar [normal]. Circle of Willis [complete/incomplete].\nANEURYSMS: [none/description]\n\nIMPRESSION: [Vessel status]. [Stenosis locations]."
  },
  {
    "title": "HRCT Lung",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "High-resolution CT of lungs",
    "modality": "CT",
    "tags": "hrct,lung,interstitial,ild,fibrosis",
    "content": "HRCT LUNG - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLUNGS:\n- Lung volumes: [normal/reduced]\n- Ground-glass opacities: [present/absent, distribution]\n- Reticulation: [present/absent, distribution]\n- Honeycombing: [present/absent]\n- Traction bronchiectasis: [present/absent]\n- Emphysema: [present/absent, type]\n\nAIRWAYS: [normal/dilated]\nPLEURA: [normal/effusion]\n\nPATTERN: [IPF/NSIP/HP/sarcoidosis/other]\n\nIMPRESSION: [Primary diagnosis]. [Disease extent]."
  },
  {
    "title": "CECT Chest",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "Contrast-enhanced CT of chest",
    "modality": "CT",
    "tags": "chest,cect,thorax,lung,mediastinum",
    "content": "CECT CHEST - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLUNGS: Parenchyma [normal/abnormal]. Nodules [description]. Consolidation [present/absent].\nMEDIASTINUM: Lymph nodes [normal/enlarged]. Thymus [normal].\nHEART: Size [normal/enlarged]. Pericardial effusion [present/absent].\nPLEURA: Effusion [present/absent].\nCHEST WALL: [normal/abnormal].\n\nIMPRESSION: [Primary findings]. [Staging if oncologic]."
  },
  {
    "title": "Pulmonary Angiography (CTPA)",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "CT pulmonary angiography for PE",
    "modality": "CT",
    "tags": "ctpa,pulmonary embolism,pe,thrombosis,emergency",
    "content": "CT PULMONARY ANGIOGRAPHY (CTPA) - REPORT\n\nCLINICAL INDICATION: [Indication - suspected PE]\n\nFINDINGS:\nPULMONARY ARTERIES:\n- Main PA: [normal/filling defect]\n- Lobar arteries: [normal/filling defect]\n- Segmental arteries: [normal/filling defect]\n\nPULMONARY EMBOLISM: [none/description of location and extent]\nRV/LV RATIO: [measurement] ([normal <1.0])\nRV STRAIN: [present/absent]\n\nIMPRESSION: [PE status]. [RV strain assessment]."
  },
  {
    "title": "Interstitial Lung Disease CT",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "CT for interstitial lung disease",
    "modality": "CT",
    "tags": "ild,interstitial,ipf,nsip,uip,hp,fibrosis",
    "content": "CT INTERSTITIAL LUNG DISEASE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPARENCHYMAL ABNORMALITIES:\n- Ground-glass opacity: [distribution]\n- Reticulation: [distribution]\n- Honeycombing: [present/absent]\n- Traction bronchiectasis: [present/absent]\n\nDIAGNOSTIC PATTERN:\n- UIP: [present/absent]\n- NSIP: [present/absent]\n- HP: [present/absent]\n\nIMPRESSION: [Primary pattern]. [Disease extent]."
  },
  {
    "title": "Chest Infection (TB/COVID/Pneumonia)",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "CT for chest infections",
    "modality": "CT",
    "tags": "infection,pneumonia,tb,covid,tuberculosis",
    "content": "CT CHEST - INFECTION EVALUATION\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nCONSOLIDATION: [present/absent, distribution]\nGROUND-GLASS OPACITY: [present/absent, distribution]\nNODULES: [present/absent, type]\n\nTB PATTERN: [present/absent] - [apical cavitation/tree-in-bud/miliary]\nCOVID PATTERN: [present/absent] - [bilateral peripheral GGO/crazy-paving]\n\nPLEURA: Effusion [present/absent]\nLYMPHADENOPATHY: [present/absent]\n\nIMPRESSION: [Primary diagnosis]. [Extent]."
  },
  {
    "title": "Lung Nodule/Mass CT",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "CT evaluation of lung nodule or mass",
    "modality": "CT",
    "tags": "nodule,mass,lung cancer,screening,lungrads",
    "content": "CT LUNG NODULE/MASS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPRIMARY LESION:\n- Location: [lobe, segment]\n- Size: [dimensions]\n- Morphology: [shape, margins]\n- Density: [solid/ground-glass/part-solid]\n- Calcification: [present/absent]\n\nTNM STAGING: T[N]M[stage]\n\nLUNG-RADS (if screening): Category [X]\n\nIMPRESSION: [Nodule description]. [LUNG-RADS category]."
  },
  {
    "title": "Pleural Disease CT",
    "category": "CT Chest",
    "bodyPart": "Chest",
    "description": "CT evaluation of pleural diseases",
    "modality": "CT",
    "tags": "pleural,effusion,mesothelioma,empyema,pneumothorax",
    "content": "CT PLEURAL DISEASE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPLEURAL EFFUSION: Side [right/left/bilateral]. Size [small/moderate/large].\nPLEURAL THICKENING: [present/absent, distribution]\nMALIGNANCY SIGNS:\n- Circumferential thickening: [present/absent]\n- Nodularity: [present/absent]\nPNEUMOTHORAX: [present/absent, size]\n\nIMPRESSION: [Primary finding]. [Benign vs malignant features]."
  },
  {
    "title": "CT Coronary Angiography",
    "category": "CT Cardiovascular",
    "bodyPart": "Heart",
    "description": "CT angiography of coronary arteries",
    "modality": "CT",
    "tags": "coronary,cardiac,angiography,heart,stenosis",
    "content": "CT CORONARY ANGIOGRAPHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nCORONARY ARTERIES:\n- LM: [normal/plaque/stenosis]\n- LAD: Proximal [normal/stenosis%], Mid [normal/stenosis%]\n- LCx: Proximal [normal/stenosis%]\n- RCA: Proximal [normal/stenosis%]\n\nPLAQUE: Calcified [present/absent]. Non-calcified [present/absent].\n\nIMPRESSION: [Coronary status]. [Significant stenosis]."
  },
  {
    "title": "Calcium Scoring CT",
    "category": "CT Cardiovascular",
    "bodyPart": "Heart",
    "description": "CT for coronary calcium scoring",
    "modality": "CT",
    "tags": "calcium scoring,coronary,cardiac risk,agatston",
    "content": "CT CORONARY CALCIUM SCORING - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nCALCIUM SCORES:\n- LM: [score]\n- LAD: [score]\n- LCx: [score]\n- RCA: [score]\n\nTOTAL AGATSTON SCORE: [X]\nPERCENTILE: [X]th percentile\nRISK: [Minimal/Mild/Moderate/High]\n\nIMPRESSION: Total score [X]. [Risk category] cardiovascular risk."
  },
  {
    "title": "CT Aorta",
    "category": "CT Cardiovascular",
    "bodyPart": "Aorta",
    "description": "CT angiography of the aorta",
    "modality": "CT",
    "tags": "aorta,aneurysm,dissection,angiography,vascular",
    "content": "CT AORTA - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nASCENDING AORTA: Diameter [X] cm\nAORTIC ARCH: Diameter [X] cm\nDESCENDING AORTA: Diameter [X] cm\nABDOMINAL AORTA: Diameter [X] cm\n\nANEURYSM: [present/absent, location, size]\nDISSECTION: [present/absent, type, extent]\n\nIMPRESSION: [Aortic findings]. [Aneurysm/dissection status]."
  },
  {
    "title": "CT Peripheral Angiography",
    "category": "CT Cardiovascular",
    "bodyPart": "Extremities",
    "description": "CT angiography of peripheral vessels",
    "modality": "CT",
    "tags": "peripheral,angiography,pad,leg arteries,vascular",
    "content": "CT PERIPHERAL ANGIOGRAPHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nRIGHT LOWER LIMB:\n- Iliac: [patent/stenosis/occlusion]\n- Femoral: [patent/stenosis/occlusion]\n- Popliteal: [patent/stenosis/occlusion]\n- Tibial: [patent/stenosis/occlusion]\n\nLEFT LOWER LIMB:\n- Iliac: [patent/stenosis/occlusion]\n- Femoral: [patent/stenosis/occlusion]\n- Popliteal: [patent/stenosis/occlusion]\n- Tibial: [patent/stenosis/occlusion]\n\nRUNOFF: [good/fair/poor]\n\nIMPRESSION: [Stenosis/occlusion locations]. [Runoff status]."
  },
  {
    "title": "CT Pulmonary Veins",
    "category": "CT Cardiovascular",
    "bodyPart": "Heart",
    "description": "CT angiography of pulmonary veins",
    "modality": "CT",
    "tags": "pulmonary veins,ablation,afib,cardiac",
    "content": "CT PULMONARY VEINS - REPORT\n\nCLINICAL INDICATION: [Indication - pre-ablation]\n\nFINDINGS:\nPULMONARY VEIN ANATOMY:\n- Right superior: [diameter]\n- Right inferior: [diameter]\n- Left superior: [diameter]\n- Left inferior: [diameter]\n\nVARIANTS: Common trunk [present/absent]. Accessory veins [present/absent].\nLEFT ATRIUM: Size [dimensions]. Thrombus [absent].\nESOPHAGUS: Position [description].\n\nIMPRESSION: [PV anatomy]. [Variants for ablation planning]."
  },
  {
    "title": "Plain CT Abdomen",
    "category": "CT Abdomen",
    "bodyPart": "Abdomen",
    "description": "Non-contrast CT of abdomen",
    "modality": "CT",
    "tags": "abdomen,plain ct,non-contrast,belly",
    "content": "PLAIN CT ABDOMEN - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLIVER: Size [normal/enlarged]. Lesions [present/absent].\nGALLBLADDER: [present/absent, stones, wall thickness]\nPANCREAS: [normal/abnormal]\nSPLEEN: Size [normal/enlarged]\nKIDNEYS: Right [size, lesions], Left [size, lesions]\nADRENALS: [normal/enlarged]\nBOWEL: [unremarkable/abnormal]\nASCITES: [present/absent]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CECT Abdomen",
    "category": "CT Abdomen",
    "bodyPart": "Abdomen",
    "description": "Contrast-enhanced CT of abdomen",
    "modality": "CT",
    "tags": "abdomen,cect,contrast,belly",
    "content": "CECT ABDOMEN - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLIVER: Size and enhancement [normal/abnormal]. Lesions [description].\nGALLBLADDER/CBD: [normal/abnormal]\nPANCREAS: [normal/abnormal]\nSPLEEN: [normal/abnormal]\nKIDNEYS: Enhancement [normal/abnormal]. Lesions [description].\nADRENALS: [normal/abnormal]\nVESSELS: Aorta [normal/aneurysm]. IVC [normal/thrombosis].\n\nIMPRESSION: [Primary findings]. [Staging if oncologic]."
  },
  {
    "title": "Triple Phase Liver CT",
    "category": "CT Abdomen",
    "bodyPart": "Liver",
    "description": "Triple phase CT for liver lesions",
    "modality": "CT",
    "tags": "liver,triple phase,hcc,hemangioma,oncology",
    "content": "TRIPLE PHASE LIVER CT - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLIVER LESION:\n- Location: [segment]\n- Size: [dimensions]\n- Arterial phase: [enhancement pattern]\n- Portal venous phase: [enhancement pattern]\n- Delayed phase: [enhancement pattern]\n\nCHARACTERIZATION: [Hemangioma/HCC/Metastasis/FNH/Adenoma]\n\nREST OF LIVER: Parenchyma [normal/cirrhotic]. Portal vein [patent/thrombosis].\n\nIMPRESSION: [Lesion characterization]. [Diagnosis]."
  },
  {
    "title": "Pancreas Protocol CT",
    "category": "CT Abdomen",
    "bodyPart": "Pancreas",
    "description": "CT protocol for pancreatic evaluation",
    "modality": "CT",
    "tags": "pancreas,pancreatic cancer,pancreatitis,oncology",
    "content": "CT PANCREAS PROTOCOL - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPANCREAS:\n- Size: [head, body, tail]\n- Enhancement: [normal/heterogeneous]\n- Lesions: [location, size, characteristics]\n\nPANCREATIC DUCT: [normal/dilated]\nBILE DUCTS: CBD [diameter], IHBR [normal/dilated]\nADJACENT STRUCTURES: Duodenum [normal/invasion]. Vessels [patent/encased].\nLYMPH NODES: [normal/enlarged]\nMETASTASIS: Liver [present/absent]\n\nIMPRESSION: [Pancreatic findings]. [Staging if malignancy]."
  },
  {
    "title": "Hepatobiliary System CT",
    "category": "CT Abdomen",
    "bodyPart": "Liver",
    "description": "CT of hepatobiliary system",
    "modality": "CT",
    "tags": "hepatobiliary,liver,gallbladder,biliary",
    "content": "CT HEPATOBILIARY SYSTEM - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLIVER: Size [normal/enlarged/cirrhotic]. Parenchyma [description].\nGALLBLADDER: [present/absent]. Stones [present/absent]. Wall thickness [mm].\nBILIARY TREE: IHBR [normal/dilated]. CBD [diameter, stones, stricture].\nPORTAL VENOUS: Portal vein [patent/thrombosis]. Varices [present/absent].\n\nIMPRESSION: [Primary findings]. [Obstruction level if present]."
  },
  {
    "title": "Spleen CT",
    "category": "CT Abdomen",
    "bodyPart": "Spleen",
    "description": "CT evaluation of spleen",
    "modality": "CT",
    "tags": "spleen,splenic,splenomegaly",
    "content": "CT SPLEEN - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nSPLEEN:\n- Size: [dimensions, normal/enlarged]\n- Parenchyma: [homogeneous/heterogeneous]\n- Focal lesions: [present/absent]\n- Infarction: [present/absent]\n\nSPLENIC VESSELS: [patent/abnormal]\n\nIMPRESSION: [Spleen findings]. [Pathology if identified]."
  },
  {
    "title": "Adrenals CT",
    "category": "CT Abdomen",
    "bodyPart": "Adrenal Glands",
    "description": "CT evaluation of adrenal glands",
    "modality": "CT",
    "tags": "adrenal,incidentaloma,adenoma",
    "content": "CT ADRENALS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nRIGHT ADRENAL: Size [dimensions]. Lesions [size, HU].\nLEFT ADRENAL: Size [dimensions]. Lesions [size, HU].\n\nCHARACTERIZATION:\n- Attenuation: [Hounsfield units]\n- Enhancement washout: [if performed]\n\nIMPRESSION: [Adrenal findings]. [Adenoma vs non-adenoma]."
  },
  {
    "title": "CT Pelvis",
    "category": "CT Pelvis",
    "bodyPart": "Pelvis",
    "description": "CT of the pelvis",
    "modality": "CT",
    "tags": "pelvis,pelvic,bladder,prostate,uterus",
    "content": "CT PELVIS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBLADDER: Distension [well-distended/collapsed]. Wall [normal/thickened]. Lesions [present/absent].\nPROSTATE/UTERUS: [normal/enlarged/lesions]\nOVARIES: Right [normal], Left [normal]\nRECTUM: [normal/wall thickening/mass]\nLYMPH NODES: Pelvic nodes [normal/enlarged]\nBONES: Pelvic bones [normal/lesions]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Urinary Bladder",
    "category": "CT Pelvis",
    "bodyPart": "Bladder",
    "description": "CT evaluation of urinary bladder",
    "modality": "CT",
    "tags": "bladder,urinary,hematuria,bladder cancer",
    "content": "CT URINARY BLADDER - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBLADDER:\n- Distension: [well-distended]\n- Wall thickness: [mm]\n- Focal thickening: [present/absent, location]\n- Mass: [present/absent, size, location]\n\nURETERS: Right [normal/dilated], Left [normal/dilated]\nLYMPH NODES: Pelvic [normal/enlarged]\n\nIMPRESSION: [Bladder findings]. [Staging if malignancy]."
  },
  {
    "title": "CT Prostate",
    "category": "CT Pelvis",
    "bodyPart": "Prostate",
    "description": "CT evaluation of prostate",
    "modality": "CT",
    "tags": "prostate,prostate cancer,bph,psa",
    "content": "CT PROSTATE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPROSTATE:\n- Size: [dimensions]\n- Enlargement: [BPH changes]\n- Extraprostatic extension: [present/absent]\n\nSEMINAL VESICLES: [normal/invasion]\nLYMPH NODES: Pelvic [normal/enlarged], Retroperitoneal [normal/enlarged]\nBONES: Pelvis/spine [metastatic/normal]\n\nIMPRESSION: [Prostate findings]. [Staging if malignancy]."
  },
  {
    "title": "CT Uterus Ovaries",
    "category": "CT Pelvis",
    "bodyPart": "Uterus",
    "description": "CT evaluation of uterus and ovaries",
    "modality": "CT",
    "tags": "uterus,ovaries,gynecologic,ovarian cancer",
    "content": "CT UTERUS AND OVARIES - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nUTERUS: Size [dimensions]. Myometrium [homogeneous/heterogeneous]. Endometrium [thickness]. Mass [present/absent].\nOVARIES: Right [size, lesions], Left [size, lesions]\nADNEXA: [normal/mass]\nLYMPH NODES: Pelvic [normal/enlarged], Para-aortic [normal/enlarged]\n\nIMPRESSION: [Uterine/ovarian findings]. [Staging if malignancy]."
  },
  {
    "title": "CT Rectum Anal Canal",
    "category": "CT Pelvis",
    "bodyPart": "Rectum",
    "description": "CT evaluation of rectum and anal canal",
    "modality": "CT",
    "tags": "rectum,anal,rectal cancer,colorectal",
    "content": "CT RECTUM AND ANAL CANAL - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nRECTUM:\n- Mass: [present/absent, location, size]\n- Wall thickness: [mm]\n- Extramural extension: [present/absent]\n\nMESORECTUM: [normal/invasion]\nLYMPH NODES: Mesorectal [normal/enlarged], Pelvic [normal/enlarged]\nDISTANT METASTASIS: Liver [present/absent], Lungs [present/absent]\n\nIMPRESSION: [Rectal findings]. [TNM staging]."
  },
  {
    "title": "CT KUB Stone Protocol",
    "category": "CT KUB",
    "bodyPart": "Kidneys",
    "description": "CT KUB for kidney stone evaluation",
    "modality": "CT",
    "tags": "kub,kidney stone,calculus,renal colic",
    "content": "CT KUB (STONE PROTOCOL) - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nKIDNEYS:\n- Right: [size, stones, hydronephrosis]\n- Left: [size, stones, hydronephrosis]\n\nCALCULI:\n- Right kidney: [number, size, location]\n- Left kidney: [number, size, location]\n\nURETERS:\n- Right: [calculus present/absent, size, location, hydroureter]\n- Left: [calculus present/absent, size, location, hydroureter]\n\nBLADDER: [stones, distension]\n\nIMPRESSION: [Stone burden]. [Obstruction level if present]."
  },
  {
    "title": "Renal Calculus CT",
    "category": "CT KUB",
    "bodyPart": "Kidneys",
    "description": "CT evaluation of renal calculi",
    "modality": "CT",
    "tags": "renal calculus,kidney stone,nephrolithiasis",
    "content": "CT RENAL CALCULUS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nKIDNEYS:\n- Right: Size [normal/atrophic]. Calculi [number, size, location]. Hydronephrosis [grade 0-4].\n- Left: Size [normal/atrophic]. Calculi [number, size, location]. Hydronephrosis [grade 0-4].\n\nCALCULUS CHARACTERISTICS:\n- Density: [Hounsfield units]\n- Size: [mm]\n\nIMPRESSION: [Renal stone burden]. [Hydronephrosis status]."
  },
  {
    "title": "Ureteric Calculus CT",
    "category": "CT KUB",
    "bodyPart": "Ureters",
    "description": "CT evaluation of ureteric calculi",
    "modality": "CT",
    "tags": "ureteric calculus,ureter stone,obstruction",
    "content": "CT URETERIC CALCULUS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nURETERIC CALCULUS:\n- Side: [right/left]\n- Location: [upper/mid/lower ureter]\n- Size: [mm]\n- Hydroureter: [present/absent]\n\nKIDNEY (ipsilateral):\n- Hydronephrosis: [grade]\n- Perinephric stranding: [present/absent]\n\nIMPRESSION: Ureteric calculus at [location]. [Degree of obstruction]."
  },
  {
    "title": "Bladder Calculus CT",
    "category": "CT KUB",
    "bodyPart": "Bladder",
    "description": "CT evaluation of bladder calculi",
    "modality": "CT",
    "tags": "bladder calculus,bladder stone,vesical calculus",
    "content": "CT BLADDER CALCULUS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBLADDER:\n- Calculi: [number, size]\n- Bladder wall: [normal/thickened]\n- Diverticula: [present/absent]\n\nOUTLET OBSTRUCTION: [signs present/absent]\nPROSTATE (if male): [enlargement/normal]\n\nIMPRESSION: [Bladder calculus findings]. [Associated findings]."
  },
  {
    "title": "Obstructive Uropathy CT",
    "category": "CT KUB",
    "bodyPart": "Kidneys",
    "description": "CT evaluation of obstructive uropathy",
    "modality": "CT",
    "tags": "obstructive uropathy,hydronephrosis,obstruction",
    "content": "CT OBSTRUCTIVE UROPATHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nHYDRONEPHROSIS:\n- Right: [grade 0-4]\n- Left: [grade 0-4]\n\nHYDROURETER:\n- Right: [present/absent]\n- Left: [present/absent]\n\nCAUSE OF OBSTRUCTION:\n- [Calculus/Stricture/Mass/Extrinsic compression]\n- Location: [specify]\n\nKIDNEY PARENCHYMA: [normal/thinned]\nPERINEPHRIC CHANGES: Stranding [present/absent]. Fluid [present/absent].\n\nIMPRESSION: [Obstruction level and cause]. [Degree of hydronephrosis]."
  },
  {
    "title": "Cervical Spine CT",
    "category": "CT Spine",
    "bodyPart": "Cervical Spine",
    "description": "CT of cervical spine",
    "modality": "CT",
    "tags": "cervical spine,neck spine,c-spine,trauma",
    "content": "CT CERVICAL SPINE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nVERTEBRAE (C1-C7):\n- Alignment: [normal/abnormal]\n- Fractures: [present/absent, location]\n- Degenerative changes: [present/absent]\n\nDISC SPACES: [normal/narrowed]\nSPINAL CANAL: Diameter [normal/narrowed]\nNEURAL FORAMINA: [patent/narrowed]\nSOFT TISSUES: Prevertebral [normal/swelling]\n\nIMPRESSION: [Primary findings]. [Fracture status if trauma]."
  },
  {
    "title": "Dorsal Spine CT",
    "category": "CT Spine",
    "bodyPart": "Thoracic Spine",
    "description": "CT of dorsal/thoracic spine",
    "modality": "CT",
    "tags": "dorsal spine,thoracic spine,t-spine",
    "content": "CT DORSAL SPINE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nVERTEBRAE (T1-T12):\n- Alignment: [normal/abnormal]\n- Fractures: [present/absent]\n- Degenerative changes: [present/absent]\n\nDISC SPACES: [normal/narrowed]\nSPINAL CANAL: [normal/stenosis]\nSOFT TISSUES: Paraspinal [normal/abnormal]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "Lumbar Spine CT",
    "category": "CT Spine",
    "bodyPart": "Lumbar Spine",
    "description": "CT of lumbar spine",
    "modality": "CT",
    "tags": "lumbar spine,lower back,l-spine,disc herniation",
    "content": "CT LUMBAR SPINE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nVERTEBRAE (L1-L5):\n- Alignment: [normal/abnormal]\n- Spondylolisthesis: [present/absent, grade]\n- Fractures: [present/absent]\n\nDISC SPACES:\n- L1-L2: [normal/bulge/herniation]\n- L2-L3: [normal/bulge/herniation]\n- L3-L4: [normal/bulge/herniation]\n- L4-L5: [normal/bulge/herniation]\n- L5-S1: [normal/bulge/herniation]\n\nSPINAL CANAL: [normal/stenosis]\nNEURAL FORAMINA: [patent/narrowed]\nFACET JOINTS: [normal/hypertrophy]\n\nIMPRESSION: [Primary findings]. [Level of significant pathology]."
  },
  {
    "title": "Trauma Spine CT",
    "category": "CT Spine",
    "bodyPart": "Spine",
    "description": "CT spine for trauma evaluation",
    "modality": "CT",
    "tags": "trauma,spine fracture,spinal injury,emergency",
    "content": "CT SPINE FOR TRAUMA - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nALIGNMENT: [normal/abnormal]\nVERTEBRAL BODY FRACTURES: [present/absent - level, type, displacement]\nPOSTERIOR ELEMENT FRACTURES: [present/absent]\nSPINAL CANAL: [intact/compromised]\nSOFT TISSUES: Prevertebral swelling [present/absent]. Hematoma [present/absent].\n\nIMPRESSION: [Fracture description]. [Stability concerns]."
  },
  {
    "title": "Degenerative Spine Disease CT",
    "category": "CT Spine",
    "bodyPart": "Spine",
    "description": "CT for degenerative spine disease",
    "modality": "CT",
    "tags": "degenerative,disc disease,stenosis,arthritis",
    "content": "CT DEGENERATIVE SPINE DISEASE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nDISC DEGENERATION: Levels [specify]. Disc height [normal/decreased]. Bulge [present/absent].\nFACET ARTHROPATHY: [present/absent, severity, levels]\nSPINAL CANAL STENOSIS: [present/absent, levels, severity]\nNEURAL FORAMINAL STENOSIS: [present/absent, levels, side]\nOSTEOPHYTES: [present/absent, location]\nSPONDYLOLISTHESIS: [present/absent, level, grade]\n\nIMPRESSION: [Degenerative changes]. [Significant stenosis]."
  },
  {
    "title": "Disc Bulge Herniation CT",
    "category": "CT Spine",
    "bodyPart": "Spine",
    "description": "CT evaluation of disc pathology",
    "modality": "CT",
    "tags": "disc herniation,disc bulge,radiculopathy,sciatica",
    "content": "CT DISC BULGE/HERNIATION - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nDISC ABNORMALITIES:\n[Level]:\n- Disc bulge: [circumferential/focal]\n- Disc herniation: [protrusion/extrusion/sequestration]\n- Direction: [central/paracentral/foraminal/lateral]\n- Neural compression: [present/absent]\n\nIMPRESSION: [Disc pathology]. [Neural compression status]."
  },
  {
    "title": "Spinal Canal Stenosis CT",
    "category": "CT Spine",
    "bodyPart": "Spine",
    "description": "CT evaluation of spinal stenosis",
    "modality": "CT",
    "tags": "stenosis,spinal canal,neurogenic claudication",
    "content": "CT SPINAL CANAL STENOSIS - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nSPINAL CANAL:\n- Levels of stenosis: [specify]\n- Severity: [mild/moderate/severe]\n- AP diameter: [mm]\n\nCAUSE OF STENOSIS:\n- Disc bulge: [present/absent]\n- Facet hypertrophy: [present/absent]\n- Ligamentum flavum: [thickened/normal]\n- Osteophytes: [present/absent]\n\nNEURAL FORAMINA: Stenosis [present/absent, levels, side]\n\nIMPRESSION: [Stenosis levels and severity]. [Cause]."
  },
  {
    "title": "CT Shoulder",
    "category": "CT Musculoskeletal",
    "bodyPart": "Shoulder",
    "description": "CT of shoulder joint",
    "modality": "CT",
    "tags": "shoulder,humerus,glenoid,fracture",
    "content": "CT SHOULDER - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBONES:\n- Humeral head: [normal/fracture/lesions]\n- Glenoid: [normal/fracture/wear]\n- Clavicle: [normal/abnormal]\n- Scapula: [normal/abnormal]\n\nJOINT SPACE: [normal/narrowed/widened]\nFRACTURES: [present/absent, description]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Elbow",
    "category": "CT Musculoskeletal",
    "bodyPart": "Elbow",
    "description": "CT of elbow joint",
    "modality": "CT",
    "tags": "elbow,fracture,joint",
    "content": "CT ELBOW - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBONES:\n- Distal humerus: [normal/fracture]\n- Radius: [normal/fracture]\n- Ulna: [normal/fracture]\n\nJOINT SPACE: [normal/narrowed]\nSOFT TISSUES: [normal/swelling/effusion]\nFRACTURES: [present/absent, description]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Wrist Hand",
    "category": "CT Musculoskeletal",
    "bodyPart": "Wrist/Hand",
    "description": "CT of wrist and hand",
    "modality": "CT",
    "tags": "wrist,hand,carpal,fracture",
    "content": "CT WRIST AND HAND - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBONES:\n- Distal radius: [normal/fracture]\n- Distal ulna: [normal/fracture]\n- Carpal bones: [normal/fracture]\n- Metacarpals: [normal/fracture]\n- Phalanges: [normal/fracture]\n\nJOINT SPACES: Radiocarpal [normal], Intercarpal [normal]\nCARPAL ALIGNMENT: [normal/abnormal]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Hip",
    "category": "CT Musculoskeletal",
    "bodyPart": "Hip",
    "description": "CT of hip joint",
    "modality": "CT",
    "tags": "hip,femur,acetabulum,fracture,avascular necrosis",
    "content": "CT HIP - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBONES:\n- Femoral head: [normal/fracture/AVN/arthritic]\n- Acetabulum: [normal/fracture/wear]\n- Femoral neck: [normal/fracture]\n\nJOINT SPACE: [normal/narrowed/widened]\nSOFT TISSUES: [normal/effusion]\nFRACTURES: [present/absent, type]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Knee",
    "category": "CT Musculoskeletal",
    "bodyPart": "Knee",
    "description": "CT of knee joint",
    "modality": "CT",
    "tags": "knee,tibia,femur,patella,fracture",
    "content": "CT KNEE - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBONES:\n- Distal femur: [normal/fracture]\n- Proximal tibia: [normal/fracture]\n- Patella: [normal/fracture]\n- Fibula: [normal/fracture]\n\nJOINT SPACE: Medial [normal], Lateral [normal], PF [normal]\nALIGNMENT: [normal/valgus/varus]\nEFFUSION: [present/absent]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "CT Ankle Foot",
    "category": "CT Musculoskeletal",
    "bodyPart": "Ankle/Foot",
    "description": "CT of ankle and foot",
    "modality": "CT",
    "tags": "ankle,foot,calcaneus,talus,fracture",
    "content": "CT ANKLE AND FOOT - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nANKLE:\n- Tibia: [normal/fracture]\n- Fibula: [normal/fracture]\n- Talus: [normal/fracture]\n- Calcaneus: [normal/fracture]\n\nFOOT:\n- Tarsal bones: [normal/fracture]\n- Metatarsals: [normal/fracture]\n- Phalanges: [normal/fracture]\n\nALIGNMENT: [normal/abnormal]\n\nIMPRESSION: [Primary findings]."
  },
  {
    "title": "Fracture Assessment CT",
    "category": "CT Musculoskeletal",
    "bodyPart": "Bones",
    "description": "CT for fracture assessment",
    "modality": "CT",
    "tags": "fracture,trauma,bone injury,orthopedic",
    "content": "CT FRACTURE ASSESSMENT - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nFRACTURE:\n- Location: [bone, region]\n- Pattern: [transverse/spiral/oblique/comminuted]\n- Displacement: [mm, angulation]\n- Intra-articular extension: [present/absent]\n\nASSOCIATED FINDINGS:\n- Soft tissue injury: [present/absent]\n- Joint involvement: [present/absent]\n\nIMPRESSION: [Fracture description]. [Classification if applicable]."
  },
  {
    "title": "Bone Tumor CT",
    "category": "CT Musculoskeletal",
    "bodyPart": "Bones",
    "description": "CT evaluation of bone tumors",
    "modality": "CT",
    "tags": "bone tumor,lytic lesion,sclerotic lesion,oncology",
    "content": "CT BONE TUMOR - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nLESION:\n- Location: [bone, region]\n- Size: [dimensions]\n- Margin: [well-defined/ill-defined]\n- Matrix: [lytic/sclerotic/mixed]\n- Cortical breakthrough: [present/absent]\n- Soft tissue component: [present/absent]\n\nPERIOSTEAL REACTION: [present/absent, type]\n\nIMPRESSION: [Lesion description]. [Differential diagnosis]."
  },
  {
    "title": "CT Angiography Brain",
    "category": "CT Vascular",
    "bodyPart": "Brain",
    "description": "CTA of intracranial vessels",
    "modality": "CT",
    "tags": "cta,brain,angiography,aneurysm,stroke",
    "content": "CT ANGIOGRAPHY BRAIN - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nANTERIOR CIRCULATION:\n- ICA (bilateral): [patent/stenosis/occlusion]\n- MCA (bilateral): [patent/stenosis/occlusion]\n- ACA (bilateral): [patent/stenosis/occlusion]\n\nPOSTERIOR CIRCULATION:\n- Vertebral: [patent/stenosis]\n- Basilar: [patent/stenosis]\n- PCA: [patent/stenosis]\n\nCIRCLE OF WILLIS: [complete/incomplete]\nANEURYSMS: [present/absent, location, size]\nVENOUS SINUSES: [patent/thrombosis]\n\nIMPRESSION: [Vascular findings]. [Aneurysm status]."
  },
  {
    "title": "CT Angiography Neck",
    "category": "CT Vascular",
    "bodyPart": "Neck",
    "description": "CTA of neck vessels",
    "modality": "CT",
    "tags": "cta,neck,carotid,vertebral,stenosis",
    "content": "CT ANGIOGRAPHY NECK - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nCOMMON CAROTID: Right [patent/stenosis], Left [patent/stenosis]\nINTERNAL CAROTID:\n- Right: [patent/stenosis/occlusion] - NASCET [%]\n- Left: [patent/stenosis/occlusion] - NASCET [%]\n\nEXTERNAL CAROTID: [patent/abnormal]\nVERTEBRAL: Right [patent/hypoplastic], Left [patent/hypoplastic]\n\nIMPRESSION: [Vessel patency]. [Stenosis locations]."
  },
  {
    "title": "CT Angiography Aorta",
    "category": "CT Vascular",
    "bodyPart": "Aorta",
    "description": "CTA of aorta",
    "modality": "CT",
    "tags": "cta,aorta,aneurysm,dissection,vascular",
    "content": "CT ANGIOGRAPHY AORTA - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nAORTA:\n- Ascending: Diameter [X] cm\n- Arch: Diameter [X] cm\n- Descending: Diameter [X] cm\n- Abdominal: Diameter [X] cm\n\nANEURYSM: [present/absent, location, size]\nDISSECTION: [present/absent, Stanford type, extent]\nBRANCH VESSELS: [patent/involved]\n\nIMPRESSION: [Aortic findings]. [Aneurysm/dissection status]."
  },
  {
    "title": "CT Angiography Lower Limb",
    "category": "CT Vascular",
    "bodyPart": "Extremities",
    "description": "CTA of lower limb arteries",
    "modality": "CT",
    "tags": "cta,lower limb,pad,claudication,peripheral vascular",
    "content": "CT ANGIOGRAPHY LOWER LIMB - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nRIGHT: Iliac [patent/stenosis], Femoral [patent/stenosis], Popliteal [patent/stenosis], Tibial [patent/stenosis]\nLEFT: Iliac [patent/stenosis], Femoral [patent/stenosis], Popliteal [patent/stenosis], Tibial [patent/stenosis]\n\nRUNOFF: [good/fair/poor]\n\nIMPRESSION: [Stenosis/occlusion locations]. [Runoff status]."
  },
  {
    "title": "CT Venography",
    "category": "CT Vascular",
    "bodyPart": "Veins",
    "description": "CT venography for venous disease",
    "modality": "CT",
    "tags": "venography,dvt,thrombosis,venous",
    "content": "CT VENOGRAPHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nVENOUS SYSTEM:\n- IVC: [patent/thrombosis]\n- Iliac veins: [patent/thrombosis]\n- Femoral veins: [patent/thrombosis]\n- Popliteal veins: [patent/thrombosis]\n- Calf veins: [patent/thrombosis]\n\nTHROMBUS: [present/absent, location, extent]\nCOLLATERALS: [present/absent]\n\nIMPRESSION: [DVT status]. [Extent of thrombosis]."
  },
  {
    "title": "Portal Venous System CT",
    "category": "CT Vascular",
    "bodyPart": "Liver",
    "description": "CT of portal venous system",
    "modality": "CT",
    "tags": "portal vein,portal hypertension,varices,cirrhosis",
    "content": "CT PORTAL VENOUS SYSTEM - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPORTAL VEIN: [patent/thrombosis], Diameter [mm]\nSPLENIC VEIN: [patent/thrombosis], Diameter [mm]\nSUPERIOR MESENTERIC VEIN: [patent/thrombosis]\n\nPORTOSYSTEMIC COLLATERALS:\n- Esophageal varices: [present/absent]\n- Gastric varices: [present/absent]\n- Splenorenal shunts: [present/absent]\n- Umbilical vein: [recanalized/normal]\n\nASCITES: [present/absent]\nSPLENOMEGALY: [present/absent]\n\nIMPRESSION: [Portal vein status]. [Collaterals]."
  },
  {
    "title": "Staging CT",
    "category": "CT Oncology",
    "bodyPart": "Multiple",
    "description": "CT for oncologic staging",
    "modality": "CT",
    "tags": "staging,oncology,tnm,cancer,metastasis",
    "content": "CT STAGING - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPRIMARY TUMOR: Location [specify]. Size [dimensions]. Local extension [description].\nREGIONAL LYMPH NODES: [normal/enlarged, stations]\nDISTANT METASTASIS: Lungs [present/absent], Liver [present/absent], Bones [present/absent], Adrenals [present/absent]\n\nTNM STAGING: T[N]M[stage]\n\nIMPRESSION: [Primary tumor]. [TNM staging]. [Metastatic disease status]."
  },
  {
    "title": "Follow-Up CT",
    "category": "CT Oncology",
    "bodyPart": "Multiple",
    "description": "CT for oncologic follow-up",
    "modality": "CT",
    "tags": "follow-up,oncology,recist,response,cancer",
    "content": "CT FOLLOW-UP - REPORT\n\nCLINICAL INDICATION: [Indication]\nCOMPARISON: Prior study [date]\n\nFINDINGS:\nPRIMARY TUMOR SITE: [stable/decreased/increased/new findings]\nLYMPH NODES: [stable/decreased/increased/new]\nMETASTATIC DISEASE: Known [stable/decreased/increased], New [present/absent]\n\nTREATMENT RESPONSE: [Complete response/Partial response/Stable disease/Progressive disease]\n\nIMPRESSION: [Response to treatment]. [New findings]."
  },
  {
    "title": "Metastasis Workup CT",
    "category": "CT Oncology",
    "bodyPart": "Multiple",
    "description": "CT for metastatic disease workup",
    "modality": "CT",
    "tags": "metastasis,unknown primary,staging,oncology",
    "content": "CT METASTASIS WORKUP - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nSEARCH FOR PRIMARY:\n- Lung: [findings]\n- Liver: [findings]\n- Pancreas: [findings]\n- Kidneys: [findings]\n- GI tract: [findings]\n\nMETASTATIC SITES:\n- Lymph nodes: [stations, sizes]\n- Liver: [number, size]\n- Lungs: [number, size]\n- Bones: [location]\n- Peritoneum: [present/absent]\n\nSUGGESTED PRIMARY: [based on imaging]\n\nIMPRESSION: [Metastatic extent]. [Suggested primary if identified]."
  },
  {
    "title": "RECIST Evaluation CT",
    "category": "CT Oncology",
    "bodyPart": "Multiple",
    "description": "CT with RECIST measurements",
    "modality": "CT",
    "tags": "recist,response evaluation,oncology,measurement",
    "content": "CT RECIST EVALUATION - REPORT\n\nCLINICAL INDICATION: [Indication]\nCOMPARISON: Prior study [date]\n\nTARGET LESIONS:\n[Lesion 1]: Location [specify]. Prior [mm]. Current [mm]. Change [%]\n[Lesion 2]: Location [specify]. Prior [mm]. Current [mm]. Change [%]\n\nSUM OF DIAMETERS: Prior [mm]. Current [mm]. Change [%]\nNON-TARGET LESIONS: [present/absent, status]\nNEW LESIONS: [present/absent]\n\nOVERALL RESPONSE: [CR/PR/SD/PD]\n\nIMPRESSION: RECIST response [category]. Change [%]."
  },
  {
    "title": "Whole Body CT",
    "category": "CT Oncology",
    "bodyPart": "Whole Body",
    "description": "Whole body CT scan",
    "modality": "CT",
    "tags": "whole body,comprehensive,screening,staging",
    "content": "WHOLE BODY CT - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nHEAD AND NECK: [findings]\nCHEST: Lungs [findings], Mediastinum [findings], Heart [findings]\nABDOMEN: Liver [findings], Spleen [findings], Pancreas [findings], Kidneys [findings], Adrenals [findings]\nPELVIS: Bladder [findings], Reproductive organs [findings]\nLYMPH NODES: [comprehensive assessment]\nBONES: [findings]\n\nIMPRESSION: [Summary of significant findings]. [Recommendations]."
  },
  {
    "title": "Polytrauma Whole Body CT",
    "category": "CT Trauma",
    "bodyPart": "Whole Body",
    "description": "Whole body CT for polytrauma",
    "modality": "CT",
    "tags": "polytrauma,trauma,emergency,whole body,critical",
    "content": "CT POLYTRAUMA (WHOLE BODY) - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nHEAD: Intracranial [findings], Skull fracture [present/absent], Facial fractures [present/absent]\nCERVICAL SPINE: Fractures [present/absent], Alignment [normal/abnormal]\nCHEST: Rib fractures [present/absent], Pneumothorax [present/absent], Hemothorax [present/absent], Lung contusion [present/absent], Aortic injury [present/absent]\nABDOMEN: Liver injury [grade], Spleen injury [grade], Kidney injury [grade], Free fluid [present/absent]\nPELVIS: Fractures [present/absent], Bladder injury [present/absent]\nSPINE: Fractures [present/absent]\n\nIMPRESSION: CRITICAL: [list]. [All injuries]. COMMUNICATED: [time]."
  },
  {
    "title": "Head Injury CT",
    "category": "CT Trauma",
    "bodyPart": "Brain",
    "description": "CT for head injury",
    "modality": "CT",
    "tags": "head injury,trauma,tbi,brain injury,emergency",
    "content": "CT HEAD INJURY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nINTRACRANIAL:\n- Epidural hematoma: [present/absent]\n- Subdural hematoma: [present/absent]\n- SAH: [present/absent]\n- IVH: [present/absent]\n- Contusion: [present/absent]\n- DAI: [present/absent]\n\nMASS EFFECT: Midline shift [present/absent, mm]. Cisterns [compressed/patent]\nSKULL FRACTURE: [present/absent, location]\nSCALP: [swelling/hematoma]\n\nIMPRESSION: [Injury status]. [GCS correlation if known]."
  },
  {
    "title": "Chest Trauma CT",
    "category": "CT Trauma",
    "bodyPart": "Chest",
    "description": "CT for chest trauma",
    "modality": "CT",
    "tags": "chest trauma,rib fracture,pneumothorax,aortic injury",
    "content": "CT CHEST TRAUMA - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nBONY INJURIES:\n- Rib fractures: [present/absent, number, laterality]\n- Sternal fracture: [present/absent]\n- Spine fractures: [present/absent]\n\nPNEUMOTHORAX: [present/absent, size, tension]\nHEMOTHORAX: [present/absent, size]\nLUNG: Contusion [present/absent, extent]. Laceration [present/absent]\nAORTIC INJURY: [present/absent, location]\nDIAPHRAGM: [intact/rupture suspected]\n\nIMPRESSION: [Chest injuries]. [Aortic status]. [Life-threatening findings]."
  },
  {
    "title": "Abdominal Trauma CT",
    "category": "CT Trauma",
    "bodyPart": "Abdomen",
    "description": "CT for abdominal trauma",
    "modality": "CT",
    "tags": "abdominal trauma,liver injury,spleen injury,emergency",
    "content": "CT ABDOMINAL TRAUMA - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nSOLID ORGANS:\n- Liver: Injury [present/absent]. Grade [I-V]\n- Spleen: Injury [present/absent]. Grade [I-V]\n- Kidneys: Right [injury grade], Left [injury grade]\n\nHOLLOW VISCUS: [present/absent]\nFREE FLUID: [present/absent]. Hemoperitoneum [present/absent]\nVASCULAR: Aorta [normal/injury], IVC [normal/injury]\nRETROPERITONEUM: Hematoma [present/absent]\n\nIMPRESSION: [Organ injuries and grades]. [Active bleeding if identified]."
  },
  {
    "title": "Pelvic Trauma CT",
    "category": "CT Trauma",
    "bodyPart": "Pelvis",
    "description": "CT for pelvic trauma",
    "modality": "CT",
    "tags": "pelvic trauma,pelvic fracture,acetabulum,emergency",
    "content": "CT PELVIC TRAUMA - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPELVIC RING:\n- Sacrum: [fracture present/absent]\n- SI joints: [intact/disrupted]\n- Pubic rami: [fracture present/absent]\n- Acetabulum: [fracture present/absent]\n- Iliac wings: [fracture present/absent]\n\nFRACTURE PATTERN: [LC/APC/Vertical shear/Mixed]\nBLADDER: [normal/injury]. Contrast extravasation [present/absent]\nURETHRA: [intact/injury suspected]\nVASCULAR: Active bleeding [present/absent]. Hematoma [present/absent]\n\nIMPRESSION: [Fracture classification]. [Bladder/urethral status]."
  },
  {
    "title": "CT Enterography",
    "category": "CT Special Protocols",
    "bodyPart": "Small Bowel",
    "description": "CT enterography for small bowel",
    "modality": "CT",
    "tags": "enterography,small bowel,crohn,ibd,terminal ileum",
    "content": "CT ENTEROGRAPHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nSMALL BOWEL:\n- Distension: [adequate/inadequate]\n- Terminal ileum: [normal/abnormal]\n- Wall thickening: [present/absent, location]\n- Enhancement: [normal/increased]\n- Strictures: [present/absent]\n- Fistulas: [present/absent]\n- Abscess: [present/absent]\n\nMESENTERY: Fibrofatty proliferation [present/absent]. Nodes [present/absent].\n\nIMPRESSION: [Small bowel findings]. [Active vs chronic]. [Complications]."
  },
  {
    "title": "CT Urography",
    "category": "CT Special Protocols",
    "bodyPart": "Urinary Tract",
    "description": "CT urography for urinary tract",
    "modality": "CT",
    "tags": "urography,urinary tract,hematuria,urothelial,tcc",
    "content": "CT UROGRAPHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nKIDNEYS: Right [size, lesions], Left [size, lesions]\nCOLLECTING SYSTEM: Right renal pelvis [normal/filling defect], Left [normal/filling defect]\nURETERS: Right [normal/filling defect], Left [normal/filling defect]\nBLADDER: [normal/wall thickening/filling defect]\n\nIMPRESSION: [Urinary tract findings]. [Lesion characterization]."
  },
  {
    "title": "CT Myelography",
    "category": "CT Special Protocols",
    "bodyPart": "Spine",
    "description": "CT myelography for spinal evaluation",
    "modality": "CT",
    "tags": "myelography,myelogram,spinal canal,nerve root",
    "content": "CT MYELOGRAPHY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nTHECAL SAC: Contrast [adequate]. Filling defects [present/absent]\nSPINAL CANAL: Stenosis [present/absent, level, severity]\nNERVE ROOTS: [normal/compressed/cut-off]\nDISC HERNIATION: [present/absent, level, effect]\n\nIMPRESSION: [Level and cause of compression]. [Nerve root involvement]."
  },
  {
    "title": "Virtual Colonoscopy CT",
    "category": "CT Special Protocols",
    "bodyPart": "Colon",
    "description": "CT virtual colonoscopy",
    "modality": "CT",
    "tags": "virtual colonoscopy,colonography,colorectal,polyp,screening",
    "content": "VIRTUAL COLONOSCOPY (CT COLONOGRAPHY) - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nBOWEL PREP: [adequate/inadequate]\nDISTENSION: [good/fair/poor]\n\nFINDINGS:\nCOLON:\n- Cecum to rectum: [findings by segment]\n\nPOLYPS/LESIONS:\n- [present/absent]\n- Location: [specify]\n- Size: [mm]\n- Morphology: [sessile/pedunculated/flat]\n\nDIVERTICULOSIS: [present/absent, extent]\nEXTRACOLONIC: [relevant findings]\n\nIMPRESSION: [Polyp status]. [Colonoscopy recommendation]."
  },
  {
    "title": "Dynamic Contrast Studies CT",
    "category": "CT Special Protocols",
    "bodyPart": "Multiple",
    "description": "CT with dynamic contrast enhancement",
    "modality": "CT",
    "tags": "dynamic contrast,enhancement,multiphase,perfusion",
    "content": "CT DYNAMIC CONTRAST STUDY - REPORT\n\nCLINICAL INDICATION: [Indication]\n\nFINDINGS:\nPRE-CONTRAST: [findings]\nARTERIAL PHASE: [enhancement pattern]\nPORTAL VENOUS PHASE: [enhancement pattern]\nDELAYED PHASE: [enhancement pattern]\n\nTIME-ATTENUATION CURVE: [if applicable]\nLESION CHARACTERIZATION: [based on enhancement]\n\nIMPRESSION: [Enhancement characteristics]. [Diagnosis]."
  }
];

async function main() {
  console.log('Starting CT Templates seeding...');

  const existingTemplates = await prisma.template.findMany({ select: { title: true } });
  const existingTitles = new Set(existingTemplates.map(t => t.title.toLowerCase()));
  
  const existingCategories = await prisma.category.findMany();
  const existingBodyParts = await prisma.bodyPart.findMany();
  
  const categoryMap = new Map(existingCategories.map(c => [c.name, c]));
  const bodyPartMap = new Map(existingBodyParts.map(b => [b.name, b]));

  let addedCount = 0;
  let skippedCount = 0;

  for (const template of templates) {
    if (existingTitles.has(template.title.toLowerCase())) {
      console.log('Skipping duplicate: ' + template.title);
      skippedCount++;
      continue;
    }

    let category = categoryMap.get(template.category);
    if (!category) {
      category = await prisma.category.create({
        data: { name: template.category, description: template.category + ' templates' }
      });
      categoryMap.set(template.category, category);
      console.log('Created category: ' + category.name);
    }

    let bodyPart = bodyPartMap.get(template.bodyPart);
    if (!bodyPart) {
      bodyPart = await prisma.bodyPart.create({
        data: { name: template.bodyPart, description: template.bodyPart + ' region' }
      });
      bodyPartMap.set(template.bodyPart, bodyPart);
      console.log('Created body part: ' + bodyPart.name);
    }

    await prisma.template.create({
      data: {
        title: template.title,
        description: template.description,
        content: template.content,
        modality: template.modality,
        tags: template.tags,
        categoryId: category.id,
        bodyPartId: bodyPart.id
      }
    });
    
    existingTitles.add(template.title.toLowerCase());
    console.log('Added: ' + template.title);
    addedCount++;
  }

  console.log('\n========================================');
  console.log('CT Templates Seeding Complete!');
  console.log('========================================');
  console.log('Templates added: ' + addedCount);
  console.log('Templates skipped (duplicates): ' + skippedCount);
  
  const totalTemplates = await prisma.template.count();
  const totalCategories = await prisma.category.count();
  const totalBodyParts = await prisma.bodyPart.count();
  
  console.log('\nTotal in database:');
  console.log('  Templates: ' + totalTemplates);
  console.log('  Categories: ' + totalCategories);
  console.log('  Body Parts: ' + totalBodyParts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
