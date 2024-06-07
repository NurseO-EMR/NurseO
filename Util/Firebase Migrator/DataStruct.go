package main

import "encoding/json"

type Medication []MedicationElement

func UnmarshalMedication(data []byte) (Medication, error) {
	var r Medication
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Medication) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type MedicationElement struct {
	BrandName           string         `json:"brandName"`
	NarcoticCountNeeded bool           `json:"narcoticCountNeeded"`
	ID                  string         `json:"id"`
	Locations           []Med_Location `json:"locations"`
	GenericName         string         `json:"genericName"`
	Name                *string        `json:"name,omitempty"`
	Barcode             *string        `json:"barcode,omitempty"`
}

type Med_Location struct {
	Dose    string `json:"dose"`
	Drawer  string `json:"drawer"`
	ID      string `json:"id"`
	Slot    string `json:"slot"`
	Type    string `json:"type"`
	Barcode string `json:"barcode"`
}

type Patients []Patient

func UnmarshalPatients(data []byte) (Patients, error) {
	var r Patients
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Patients) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Patient struct {
	Allergies        []Allergy         `json:"allergies"`
	StudentReports   []StudentReport   `json:"studentReports"`
	Notes            []Note            `json:"notes"`
	LabDocURL        string            `json:"labDocURL"`
	StudentUID       string            `json:"studentUID"`
	Gender           Gender            `json:"gender"`
	Flags            []Flag            `json:"flags"`
	Diagnosis        string            `json:"diagnosis"`
	Weight           string            `json:"weight"`
	CustomOrders     []CustomOrder     `json:"customOrders"`
	Immunizations    []string          `json:"immunizations"`
	ImagingURL       *string           `json:"imagingURL,omitempty"`
	Dob              string            `json:"dob"`
	Name             PatientName       `json:"name"`
	Time             Time              `json:"time"`
	ID               string            `json:"id"`
	MedicalHistory   []MedicalHistory  `json:"medicalHistory"`
	CourseID         string            `json:"courseId"`
	Age              string            `json:"age"`
	SocialHistory    []SocialHistory   `json:"socialHistory"`
	Height           Height            `json:"height"`
	MedicationOrders []MedicationOrder `json:"medicationOrders"`
	MedicalIssues    []MedicalIssue    `json:"medicalIssues,omitempty"`
}

type Allergy struct {
	Reaction ReactionEnum `json:"reaction"`
	Name     AllergyName  `json:"name"`
}

type CustomOrder struct {
	OrderType OrderTypeEnum        `json:"orderType"`
	OrderKind CustomOrderOrderKind `json:"orderKind"`
	Order     string               `json:"order"`
	Time      *string              `json:"time,omitempty"`
}

type Flag struct {
	Reason ReasonEnum `json:"reason"`
	Name   FlagName   `json:"name"`
}

type MedicalHistory struct {
	Date  string    `json:"date"`
	Notes NotesEnum `json:"notes"`
	Title Title     `json:"title"`
}

type MedicalIssue struct {
	Assessment    string            `json:"assessment"`
	DiagnosedDate DiagnosedDateEnum `json:"diagnosedDate"`
	Name          MedicalIssueName  `json:"name"`
}

type MedicationOrder struct {
	OrderType     OrderTypeEnum            `json:"orderType"`
	Route         RouteEnum                `json:"route"`
	Notes         string                   `json:"notes"`
	Routine       RoutineEnum              `json:"routine"`
	OrderKind     MedicationOrderOrderKind `json:"orderKind"`
	Concentration string                   `json:"concentration"`
	Time          *string                  `json:"time,omitempty"`
	ID            string                   `json:"id"`
	Completed     *bool                    `json:"completed,omitempty"`
	PRNNote       string                   `json:"PRNNote"`
	Mar           []Mar                    `json:"mar"`
	Frequency     FrequencyEnum            `json:"frequency"`
	HoldReason    *string                  `json:"holdReason,omitempty"`
}

type Mar struct {
	Dose    *string `json:"dose,omitempty"`
	Hour    int64   `json:"hour"`
	Minutes int64   `json:"minutes"`
}

type Note struct {
	Date       string     `json:"date"`
	ReportType ReportType `json:"reportType"`
	Note       string     `json:"note"`
	ReportName TName      `json:"reportName"`
}

type StudentReport struct {
	Date       string     `json:"date"`
	SetName    TName      `json:"setName"`
	ReportType ReportType `json:"reportType"`
	VitalName  VitalName  `json:"vitalName"`
	Time       string     `json:"time"`
	Value      string     `json:"value"`
}

type Time struct {
	Hour    int64 `json:"hour"`
	Minutes int64 `json:"minutes"`
}

type AllergyName string

const (
	Coconut          AllergyName = "Coconut"
	Metformin        AllergyName = "Metformin"
	Nka              AllergyName = "NKA"
	Nkda             AllergyName = "NKDA"
	Penicillin       AllergyName = "Penicillin"
	PoisonIvy        AllergyName = "Poison Ivy"
	SulfaAntibiotics AllergyName = "Sulfa Antibiotics"
	Sulphonamides    AllergyName = "Sulphonamides"
)

type ReactionEnum string

const (
	Hives    ReactionEnum = "Hives"
	Rash     ReactionEnum = "Rash"
	Reaction ReactionEnum = ""
	Severe   ReactionEnum = "Severe"
	Swelling ReactionEnum = "Swelling"
)

type CustomOrderOrderKind string

const (
	Custom CustomOrderOrderKind = "custom"
)

type OrderTypeEnum string

const (
	Admission       OrderTypeEnum = "Admission"
	OrderType       OrderTypeEnum = ""
	ProtocolPathway OrderTypeEnum = "Protocol/Pathway"
	Provider        OrderTypeEnum = "Provider"
	Standing        OrderTypeEnum = "Standing"
)

type FlagName string

const (
	FallRiskPrecautions             FlagName = "Fall Risk Precautions"
	Friday                          FlagName = "Friday"
	NPOExceptIceChips               FlagName = "NPO except ice chips"
	NPOExceptIceChipsAndMedications FlagName = "NPO except ice chips and medications"
	NPOExceptIceChipsAndMeds        FlagName = "NPO (except ice chips and meds)"
	NicknameSig                     FlagName = "Nickname \"Sig\""
	Npo                             FlagName = "NPO"
	The1000MLFluidRestriction       FlagName = "1000 mL fluid restriction"
)

type ReasonEnum string

const (
	Precautions             ReasonEnum = "precautions"
	Reason                  ReasonEnum = ""
	SurgeryScheduledFor0800 ReasonEnum = "Surgery Scheduled for 0800"
)

type Gender string

const (
	Empty  Gender = " "
	Female Gender = "female"
	Male   Gender = "male"
	Other  Gender = "other"
)

type Height string

const (
	Height55 Height = "5' 5\" "
	Height57 Height = "5' 7\""
	The160CM Height = "160 cm"
	The167CM Height = "167 cm"
	The170CM Height = "170cm"
	The42    Height = "4' 2\""
	The510   Height = "5' 10\""
	The52    Height = "5' 2\""
	The54    Height = "5' 4\""
	The54CM  Height = "54 cm"
	The55    Height = "5' 5\""
	The56    Height = "5' 6\""
	The57    Height = "5'7\""
	The58    Height = "5' 8\""
	The59    Height = "5' 9\""
	The60    Height = "6' 0\""
	The61    Height = "6\"1'"
	The61CM  Height = "61 cm"
	The62    Height = "6' 2\""
)

type NotesEnum string

const (
	AxillaryLymphNode10YearsAgo  NotesEnum = "Axillary Lymph Node-10 years ago"
	CompletedTreatment10YearsAgo NotesEnum = "Completed Treatment 10 Years Ago"
	Depression                   NotesEnum = "depression"
	LastOne8MonthsAgo            NotesEnum = "last one 8 months ago"
	Notes                        NotesEnum = ""
	November2006                 NotesEnum = "November 2006"
	SelfReportedInHighSchool     NotesEnum = "self reported, in high school"
	The12YearsAgo                NotesEnum = "12 years ago"
	The15YearsAgo                NotesEnum = "15 years ago"
	The26YearsAgo                NotesEnum = "26 years ago"
	The5YearsAgo                 NotesEnum = "5 years ago"
)

type Title string

const (
	Adenectomy                                Title = "Adenectomy"
	AppendectomyAge17                         Title = "Appendectomy  (Age 17)"
	Asthma                                    Title = "Asthma"
	AttentionDeficitHyperactivityDisorderADHD Title = "Attention Deficit Hyperactivity Disorder (ADHD)"
	CerebralPalsy                             Title = "Cerebral Palsy"
	ChronicAirflowLimitationCOPD              Title = "Chronic Airflow Limitation (COPD)"
	ChronicHeartFailure                       Title = "Chronic Heart Failure"
	ChronicObstructivePulmonaryDiseaseCOPD    Title = "Chronic Obstructive Pulmonary Disease (COPD)"
	Colonoscopy                               Title = "Colonoscopy"
	CongestiveHeartFailure                    Title = "Congestive Heart Failure"
	CongestiveHeartFailureCHF                 Title = "Congestive Heart Failure (CHF)"
	Constipation                              Title = "Constipation"
	CoronaryArteryDiseaseCAD                  Title = "Coronary Artery Disease (CAD)"
	DeepVeinThrombosis                        Title = "Deep Vein Thrombosis"
	DiabetesMellitus                          Title = "Diabetes Mellitus"
	Diverticulitis                            Title = "Diverticulitis"
	EatingDisorder                            Title = "Eating Disorder"
	FattyLiverDisease                         Title = "Fatty Liver Disease"
	G2P2                                      Title = "G2P2"
	Gravida1Para0                             Title = "Gravida 1, Para 0"
	Gravida2Para1                             Title = "Gravida 2, Para 1"
	Gravida3Para2G3P2                         Title = "Gravida 3 Para 2 (G3P2)"
	Gravida5Para3                             Title = "Gravida 5, Para 3"
	GroupBScreening36WeeksPositive            Title = "Group B Screening (36 weeks): Positive"
	HepatitisC                                Title = "Hepatitis C"
	HerniaRepair                              Title = "Hernia Repair"
	HighBloodPressure                         Title = "High Blood Pressure"
	Hyperlipidemia                            Title = "Hyperlipidemia"
	Hypertension                              Title = "Hypertension"
	InguinalHerniaRepair                      Title = "Inguinal Hernia Repair"
	InsulinDependentTypeIIDiabetesMellitus    Title = "Insulin Dependent Type II Diabetes Mellitus"
	KneeArthroscopy                           Title = "Knee Arthroscopy"
	Lymphoma                                  Title = "Lymphoma "
	Migraines                                 Title = "Migraines"
	MiscarriageOfG1Pregnancy                  Title = "Miscarriage of G1 pregnancy"
	MultipleConcussions                       Title = "Multiple Concussions"
	Obesity                                   Title = "Obesity"
	PostPartumHemorrhage                      Title = "Post-Partum Hemorrhage"
	ProfoundFatigue                           Title = "Profound fatigue"
	Psoriasis                                 Title = "Psoriasis"
	RenalInsufficiency                        Title = "Renal Insufficiency"
	RightKneeArthroscopy                      Title = "Right Knee Arthroscopy"
	SickleCellDisease                         Title = "Sickle Cell Disease"
	SubtanceAbuse                             Title = "Subtance Abuse"
	SurgicalBiopsy                            Title = "Surgical Biopsy"
	The37WeeksGestation                       Title = "37 Weeks Gestation"
	TitleDepression                           Title = "Depression"
	TitleHypertension                         Title = "Hypertension "
	TypeAndScreenOPositive                    Title = "Type and Screen: O Positive"
)

type DiagnosedDateEnum string

const (
	DiagnosedDate DiagnosedDateEnum = "-"
)

type MedicalIssueName string

const (
	HistoryOfPrematurity MedicalIssueName = "History of Prematurity"
)

type FrequencyEnum string

const (
	Continuous       FrequencyEnum = "continuous"
	Daily            FrequencyEnum = " daily"
	DailyAtBedtime   FrequencyEnum = "daily at bedtime"
	EveryEightHours  FrequencyEnum = "every eight hours"
	EveryFiveHours   FrequencyEnum = "every five hours"
	EveryFourHours   FrequencyEnum = "every four hours"
	EverySixHours    FrequencyEnum = "every six hours"
	EveryTwelveHours FrequencyEnum = "every twelve hours"
	EveryTwoHours    FrequencyEnum = "every two hours"
	FourTimesDaily   FrequencyEnum = "four times daily"
	Frequency        FrequencyEnum = ""
	FrequencyDaily   FrequencyEnum = "daily"
	Once             FrequencyEnum = "once"
	OnceDaily        FrequencyEnum = "once daily"
	ThreeTimesADay   FrequencyEnum = "three times a day"
	TwiceADay        FrequencyEnum = "twice a day"
	TwoTimesDaily    FrequencyEnum = "two times daily"
)

type MedicationOrderOrderKind string

const (
	Med       MedicationOrderOrderKind = "med"
	OrderKind MedicationOrderOrderKind = ""
)

type RouteEnum string

const (
	ByMouth                           RouteEnum = "by mouth"
	ByMouthOrallyDisintegratingTablet RouteEnum = "by mouth (orally disintegrating tablet)"
	IntavenousBolus                   RouteEnum = "intavenous bolus"
	Intramuscular                     RouteEnum = "intramuscular"
	IntramuscularIM                   RouteEnum = "Intramuscular (IM)"
	Intranasal                        RouteEnum = "intranasal"
	Intravenous                       RouteEnum = "intravenous"
	IntravenousIV                     RouteEnum = "intravenous (IV)"
	IntravenousIVP                    RouteEnum = "intravenous (IVP)"
	IntravenousPiggyback              RouteEnum = "intravenous piggyback"
	IntravenousPush                   RouteEnum = "intravenous push"
	IntravenousPushIVP                RouteEnum = "intravenous push (IVP)"
	Iv                                RouteEnum = "IV"
	LeftEar                           RouteEnum = "left ear"
	MeteredDoseInhaler                RouteEnum = "metered dose inhaler"
	Oral                              RouteEnum = "oral"
	OralOrRectal                      RouteEnum = "oral or rectal"
	OralPO                            RouteEnum = "oral (PO)"
	OralPOCHEWED                      RouteEnum = "oral (PO) CHEWED"
	OralPOOrRectalPR                  RouteEnum = "oral (PO) or rectal (PR)"
	Orally                            RouteEnum = "orally"
	Rectal                            RouteEnum = "rectal"
	Route                             RouteEnum = ""
	RouteIntramuscularIM              RouteEnum = " intramuscular (IM)"
	RouteIntravenousPushIVP           RouteEnum = " intravenous push (IVP)"
	RouteSubcutaneous                 RouteEnum = "subcutaneous "
	Sq                                RouteEnum = "SQ"
	Subcutaneous                      RouteEnum = "subcutaneous"
	SubcutaneousSC                    RouteEnum = "subcutaneous (SC)"
	SublingualSL                      RouteEnum = "sublingual (SL)"
	ToTheRightEye                     RouteEnum = "to the right eye"
	Topical                           RouteEnum = "topical"
	Transdermal                       RouteEnum = "transdermal"
)

type RoutineEnum string

const (
	AsNeededPRN RoutineEnum = "as needed (PRN)"
	Now         RoutineEnum = "NOW"
	Prn         RoutineEnum = "PRN"
	Routine     RoutineEnum = ""
	Scheduled   RoutineEnum = "Scheduled"
)

type PatientName string

const (
	BaileyBill           PatientName = "Bailey, Bill"
	BanksMason           PatientName = "Banks, Mason"
	ChapmanDonna         PatientName = "Chapman, Donna"
	GriffithElla         PatientName = "Griffith, Ella"
	JohnsonAlex          PatientName = "Johnson, Alex"
	JohnsonLindsey       PatientName = "Johnson, Lindsey"
	JonesEmma            PatientName = "Jones, Emma"
	JonesGrace           PatientName = "Jones, Grace"
	JonesKara            PatientName = "Jones, Kara"
	JonesRyan            PatientName = "Jones, Ryan"
	JonesSierra          PatientName = "Jones, Sierra"
	JosieSheppard        PatientName = "Josie Sheppard"
	JosieSheppardRestore PatientName = "Josie Sheppard Restore"
	LevyMabel            PatientName = "Levy, Mabel"
	MSSnyder             PatientName = "Ms. Snyder"
	MasonEmma            PatientName = "Mason, Emma"
	MontgomeryJamie      PatientName = "Montgomery, Jamie"
	MrEmito              PatientName = "Mr. Emito"
	PotterJordan         PatientName = "Potter, Jordan"
	SheppardJosie        PatientName = "Sheppard, Josie"
	SmithRoger           PatientName = "Smith, Roger"
	StevensCarson        PatientName = "Stevens, Carson"
	ThompsonJesse        PatientName = "Thompson, Jesse"
	ThompsonMelissa      PatientName = "Thompson, Melissa"
	ThorntonJulia        PatientName = "Thornton, Julia"
	TylerSmith           PatientName = "Tyler Smith"
	WebbAdam             PatientName = "Webb Adam"
	WebbJo               PatientName = "Webb Jo"
)

type TName string

const (
	Cardiovascular           TName = "Cardiovascular"
	Gastrointestinal         TName = "Gastrointestinal"
	Genitourinary            TName = "Genitourinary"
	IORecord                 TName = "I/O Record"
	IVAssessment             TName = "IV Assessment"
	InitialVitals            TName = "Initial Vitals"
	Measurements             TName = "Measurements"
	Musculoskeletal          TName = "Musculoskeletal"
	NeurologicalPsychosocial TName = "Neurological/Psychosocial"
	Respiratory              TName = "Respiratory"
	Skin                     TName = "Skin"
	TNameHEENT               TName = "HEENT"
	TNamePain                TName = "Pain"
	Wounds                   TName = "Wounds"
)

type ReportType string

const (
	StudentAssessmentReport ReportType = "studentAssessmentReport"
	StudentIOReport         ReportType = "studentIOReport"
	StudentVitalsReport     ReportType = "studentVitalsReport"
)

type SocialHistory string

const (
	AlcoholConsumptionSocialDaily            SocialHistory = "Alcohol Consumption: \"social/daily\""
	AlcoholUse                               SocialHistory = "Alcohol Use"
	AlcoholUseOncePerWeek                    SocialHistory = "Alcohol Use (Once per Week)"
	BrianJonesHusband                        SocialHistory = "Brian Jones - husband"
	CollegeStudent                           SocialHistory = "College Student"
	CurrentSmoker                            SocialHistory = "Current Smoker"
	LivesAlone                               SocialHistory = "Lives alone "
	LivesAtHomeWithDaughter                  SocialHistory = "Lives at Home with Daughter"
	Married                                  SocialHistory = "Married"
	Married40Years                           SocialHistory = "Married 40 years"
	MarriedAnnabelleSmith                    SocialHistory = "Married: Annabelle Smith"
	NoPermanentResidence                     SocialHistory = "No Permanent Residence  "
	OccupationAtSeaFisherman                 SocialHistory = "Occupation: at sea fisherman"
	PreviousSmoker28PackPerYearQuit2YearsAgo SocialHistory = "Previous smoker - 28 pack per year (quit 2 years ago)"
	PrimaryCaregiverForSpouseWithAlzheimerS  SocialHistory = "Primary caregiver for spouse with Alzheimer's"
	RecentlyWidowedMarried50Years            SocialHistory = "Recently Widowed (married 50 years)"
	RetiredUSNavyVeteran                     SocialHistory = "Retired US Navy Veteran"
	Smokes12PackPerWeek                      SocialHistory = "Smokes (1/2 Pack per Week)"
	SmokesSocially                           SocialHistory = "Smokes (Socially)"
	SocialDrinker                            SocialHistory = "Social drinker"
	SpousePassedAway3YearsAgo                SocialHistory = "Spouse Passed Away 3 Years Ago"
	SpousePassedAway5YearsAgo                SocialHistory = "Spouse Passed Away 5 Years Ago"
	The3AdultChildrenLiveOutOfTown           SocialHistory = "3 adult children (live out of town)"
	TobaccoUseSmoker37PackYear               SocialHistory = "Tobacco Use:  smoker (37 pack/year)"
	WorksFullTime                            SocialHistory = "Works full-time"
)

type VitalName string

const (
	Abdomen                  VitalName = "Abdomen"
	Activity                 VitalName = "Activity"
	ApicalPulse              VitalName = "Apical Pulse"
	AssistiveDevices         VitalName = "Assistive Devices"
	BPLaying                 VitalName = "BP - Laying"
	BPSitting                VitalName = "BP - Sitting"
	BPStanding               VitalName = "BP - Standing"
	BestMotorResponse        VitalName = "Best Motor Response"
	BestVerbalResponse       VitalName = "Best Verbal Response"
	BowelSounds              VitalName = "Bowel Sounds"
	Bp                       VitalName = "BP"
	BrachialPulse            VitalName = "Brachial Pulse"
	BradenScaleTotal         VitalName = "Braden Scale Total"
	CarotidPulse             VitalName = "Carotid Pulse"
	CatheterSize             VitalName = "Catheter size"
	Color                    VitalName = "Color"
	Comments                 VitalName = "Comments"
	Cough                    VitalName = "Cough"
	Description              VitalName = "Description"
	DorsalisPedisPulse       VitalName = "Dorsalis pedis Pulse"
	Duration                 VitalName = "Duration"
	Ears                     VitalName = "Ears"
	Edema                    VitalName = "Edema"
	EyeOpening               VitalName = "Eye opening"
	Eyes                     VitalName = "Eyes"
	FemoralPulse             VitalName = "Femoral Pulse"
	FluidBalance             VitalName = "Fluid Balance"
	FrictionShear            VitalName = "Friction & Shear"
	GU                       VitalName = "G/U"
	Head                     VitalName = "Head"
	HeadCircleCM             VitalName = "Head Circle (cm)"
	HeartSounds              VitalName = "Heart Sounds"
	HeightIn                 VitalName = "Height (in)"
	Hr                       VitalName = "HR"
	IVAccess                 VitalName = "IV Access"
	IVCatheterSizeGuage      VitalName = "IV Catheter Size (guage)"
	IVStatus                 VitalName = "IV Status"
	IncentiveSpirometry      VitalName = "Incentive Spirometry"
	InitialWoundAssessment   VitalName = "Initial Wound Assessment"
	Intake                   VitalName = "Intake"
	IntakeCumulative         VitalName = "Intake: Cumulative"
	IntakeIVAM               VitalName = "Intake: IV AM"
	IntakeIVPM               VitalName = "Intake: IV PM"
	IntakeIntravenousIV      VitalName = "Intake: intravenous (IV)"
	IntakeOral               VitalName = "Intake: oral"
	IntakeOralAM             VitalName = "Intake: oral AM"
	IntakeOralPM             VitalName = "Intake: oral PM"
	LastBM                   VitalName = "Last BM"
	LeftBreathSounds         VitalName = "Left Breath Sounds"
	LeftPupilReaction        VitalName = "Left pupil Reaction"
	LeftPupilSizeMm          VitalName = "Left pupil size (mm)"
	Lpm                      VitalName = "LPM"
	LungSounds               VitalName = "Lung Sounds"
	MealBreakfast            VitalName = "% Meal: breakfast"
	MealDinner               VitalName = "% Meal: dinner"
	MealLunch                VitalName = "% Meal: lunch"
	Mental                   VitalName = "Mental"
	Mobility                 VitalName = "Mobility"
	Moisture                 VitalName = "Moisture"
	MucousMembranes          VitalName = "Mucous Membranes"
	Nose                     VitalName = "Nose"
	Nutrition                VitalName = "Nutrition"
	O2Sat                    VitalName = "O2 Sat"
	Orientation              VitalName = "Orientation"
	Oriented                 VitalName = "Oriented"
	OstomyTypeS              VitalName = "Ostomy Type(s)"
	OtherGISymptoms          VitalName = "Other GI Symptoms"
	Output                   VitalName = "Output"
	OutputOther              VitalName = "Output: other"
	OutputUrinary            VitalName = "Output: urinary"
	OxygenAir                VitalName = "Oxygen/Air"
	POCBloodGlucose          VitalName = "POC Blood Glucose"
	PerfusionCapillaryRefill VitalName = "Perfusion/Capillary Refill"
	PeripheralIntravenousIV  VitalName = "Peripheral Intravenous (IV)"
	Perrla                   VitalName = "PERRLA"
	PoplitealPulse           VitalName = "Popliteal Pulse"
	PosteriorTibialPulse     VitalName = "Posterior tibial Pulse"
	PressureUlcerStage       VitalName = "pressure ulcer stage"
	ROM                      VitalName = "ROM"
	RadialPulse              VitalName = "Radial Pulse"
	RespiratoryPattern       VitalName = "Respiratory Pattern"
	RightBreathSounds        VitalName = "Right Breath Sounds"
	RightPupilReaction       VitalName = "Right pupil Reaction"
	RightPupilSizeMm         VitalName = "Right pupil size (mm)"
	Rr                       VitalName = "RR"
	SecretionDescription     VitalName = "Secretion Description"
	SeizurePrecautions       VitalName = "Seizure Precautions"
	SensoryPerception        VitalName = "Sensory Perception"
	SiteAssessment           VitalName = "Site Assessment"
	SkinColor                VitalName = "Skin Color"
	SkinIntegrity            VitalName = "Skin Integrity"
	SkinMoister              VitalName = "Skin Moister"
	SkinTemperature          VitalName = "Skin Temperature"
	SkinTurgor               VitalName = "Skin Turgor"
	SnackAM                  VitalName = "% Snack: AM"
	SnackPM                  VitalName = "% Snack: PM"
	Speech                   VitalName = "Speech"
	Stoma                    VitalName = "Stoma"
	SuctionDevice            VitalName = "Suction Device"
	SuctionRoute             VitalName = "Suction Route"
	SuctionSizeFr            VitalName = "Suction Size (fr)"
	Telemetry                VitalName = "Telemetry"
	Temp                     VitalName = "Temp"
	TemporalPulse            VitalName = "Temporal Pulse"
	Throat                   VitalName = "Throat"
	TubeStatus               VitalName = "Tube Status"
	TubeType                 VitalName = "Tube Type"
	UrinaryDevices           VitalName = "Urinary devices"
	UrinaryPattern           VitalName = "Urinary Pattern"
	Urine                    VitalName = "Urine"
	VitalNameHEENT           VitalName = "HEENT"
	VitalNameO2Sat           VitalName = "O2 Sat (%)"
	VitalNamePain            VitalName = "Pain"
	Volume                   VitalName = "Volume"
	WeightBearing            VitalName = "Weight Bearing"
	WeightKg                 VitalName = "Weight (kg)"
	WorkOfBreathing          VitalName = "Work of Breathing"
	WoundDepthCM             VitalName = "Wound Depth (cm)"
	WoundDrainageAmount      VitalName = "Wound drainage amount"
	WoundDrainageAppearance  VitalName = "Wound drainage appearance"
	WoundLengthCM            VitalName = "Wound Length (cm)"
	WoundLocation            VitalName = "Wound Location"
	WoundPressure            VitalName = "Wound Pressure"
	WoundTunnelingCM         VitalName = "Wound tunneling(cm)"
	WoundType                VitalName = "Wound Type"
	WoundUnderminingCM       VitalName = "Wound Undermining(cm)"
	WoundWidthCM             VitalName = "Wound Width (cm)"
)

type Settings []Setting

func UnmarshalSettings(data []byte) (Settings, error) {
	var r Settings
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Settings) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Setting struct {
	PreviewColor      string            `json:"previewColor"`
	NumberOfTimeSlots int64             `json:"numberOfTimeSlots"`
	Courses           []Course          `json:"courses"`
	Locations         []Course_Location `json:"locations"`
	ReportSet         []ReportSet       `json:"reportSet"`
}

type Course struct {
	Name string `json:"name"`
	ID   string `json:"id"`
}

type Course_Location struct {
	CourseIDS []string `json:"courseIds"`
	Station   string   `json:"station"`
	ID        string   `json:"id"`
	Building  string   `json:"building"`
}

type ReportSet struct {
	Name         string        `json:"name"`
	ReportFields []ReportField `json:"reportFields"`
	Type         Type          `json:"type"`
	Image        *string       `json:"image,omitempty"`
}

type ReportField struct {
	Name           string         `json:"name"`
	VitalsOptions  []VitalsOption `json:"VitalsOptions,omitempty"`
	FieldType      FieldType      `json:"fieldType"`
	Labels         []string       `json:"labels,omitempty"`
	AddSecondField *string        `json:"addSecondField,omitempty"`
}

type VitalsOption struct {
	Name string `json:"name"`
}

type FieldType string

const (
	Checkbox FieldType = "checkbox"
	Number   FieldType = "number"
	Options  FieldType = "options"
	TF       FieldType = "T/F"
	Text     FieldType = "text"
)

type Type string
