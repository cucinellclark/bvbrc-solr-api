import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function surveillance(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a surveillance data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Surveillance data object
     */
    getById(id, options = {}) {
      return run('surveillance', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query surveillance data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of surveillance data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('surveillance', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    // Host-related methods
    getByHostIdentifier(hostIdentifier, options = {}) {
      return run('surveillance', qb.eq('host_identifier', hostIdentifier), options, ctx.baseUrl, ctx.headers);
    },
    getByHostSpecies(hostSpecies, options = {}) {
      return run('surveillance', qb.eq('host_species', hostSpecies), options, ctx.baseUrl, ctx.headers);
    },
    getByHostSex(hostSex, options = {}) {
      return run('surveillance', qb.eq('host_sex', hostSex), options, ctx.baseUrl, ctx.headers);
    },
    getByHostAge(hostAge, options = {}) {
      return run('surveillance', qb.eq('host_age', hostAge), options, ctx.baseUrl, ctx.headers);
    },
    getByHostCommonName(hostCommonName, options = {}) {
      return run('surveillance', qb.eq('host_common_name', hostCommonName), options, ctx.baseUrl, ctx.headers);
    },
    getByHostGroup(hostGroup, options = {}) {
      return run('surveillance', qb.eq('host_group', hostGroup), options, ctx.baseUrl, ctx.headers);
    },
    getByHostHealth(hostHealth, options = {}) {
      return run('surveillance', qb.eq('host_health', hostHealth), options, ctx.baseUrl, ctx.headers);
    },
    getByHostHabitat(hostHabitat, options = {}) {
      return run('surveillance', qb.eq('host_habitat', hostHabitat), options, ctx.baseUrl, ctx.headers);
    },
    getByHostNaturalState(hostNaturalState, options = {}) {
      return run('surveillance', qb.eq('host_natural_state', hostNaturalState), options, ctx.baseUrl, ctx.headers);
    },
    getByHostCaptureStatus(hostCaptureStatus, options = {}) {
      return run('surveillance', qb.eq('host_capture_status', hostCaptureStatus), options, ctx.baseUrl, ctx.headers);
    },
    getByHostIdType(hostIdType, options = {}) {
      return run('surveillance', qb.eq('host_id_type', hostIdType), options, ctx.baseUrl, ctx.headers);
    },
    getByHostWeight(hostWeight, options = {}) {
      return run('surveillance', qb.eq('host_weight', hostWeight), options, ctx.baseUrl, ctx.headers);
    },
    getByHostHeight(hostHeight, options = {}) {
      return run('surveillance', qb.eq('host_height', hostHeight), options, ctx.baseUrl, ctx.headers);
    },
    getByHostEthnicity(hostEthnicity, options = {}) {
      return run('surveillance', qb.eq('host_ethnicity', hostEthnicity), options, ctx.baseUrl, ctx.headers);
    },
    getByHostRace(hostRace, options = {}) {
      return run('surveillance', qb.eq('host_race', hostRace), options, ctx.baseUrl, ctx.headers);
    },

    // Sample-related methods
    getBySampleIdentifier(sampleIdentifier, options = {}) {
      return run('surveillance', qb.eq('sample_identifier', sampleIdentifier), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleAccession(sampleAccession, options = {}) {
      return run('surveillance', qb.eq('sample_accession', sampleAccession), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleMaterial(sampleMaterial, options = {}) {
      return run('surveillance', qb.eq('sample_material', sampleMaterial), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleTransportMedium(sampleTransportMedium, options = {}) {
      return run('surveillance', qb.eq('sample_transport_medium', sampleTransportMedium), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleReceiptDate(sampleReceiptDate, options = {}) {
      return run('surveillance', qb.eq('sample_receipt_date', sampleReceiptDate), options, ctx.baseUrl, ctx.headers);
    },

    // Collection-related methods
    getByCollectionCity(collectionCity, options = {}) {
      return run('surveillance', qb.eq('collection_city', collectionCity), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionCountry(collectionCountry, options = {}) {
      return run('surveillance', qb.eq('collection_country', collectionCountry), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionStateProvince(collectionStateProvince, options = {}) {
      return run('surveillance', qb.eq('collection_state_province', collectionStateProvince), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionPoi(collectionPoi, options = {}) {
      return run('surveillance', qb.eq('collection_poi', collectionPoi), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionSeason(collectionSeason, options = {}) {
      return run('surveillance', qb.eq('collection_season', collectionSeason), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionYear(collectionYear, options = {}) {
      return run('surveillance', qb.eq('collection_year', collectionYear), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectorInstitution(collectorInstitution, options = {}) {
      return run('surveillance', qb.eq('collector_institution', collectorInstitution), options, ctx.baseUrl, ctx.headers);
    },
    getByContributingInstitution(contributingInstitution, options = {}) {
      return run('surveillance', qb.eq('contributing_institution', contributingInstitution), options, ctx.baseUrl, ctx.headers);
    },
    getByContactEmailAddress(contactEmailAddress, options = {}) {
      return run('surveillance', qb.eq('contact_email_address', contactEmailAddress), options, ctx.baseUrl, ctx.headers);
    },
    getByProjectIdentifier(projectIdentifier, options = {}) {
      return run('surveillance', qb.eq('project_identifier', projectIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    // Pathogen-related methods
    getBySpecies(species, options = {}) {
      return run('surveillance', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },
    getByStrain(strain, options = {}) {
      return run('surveillance', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },
    getBySubtype(subtype, options = {}) {
      return run('surveillance', qb.eq('subtype', subtype), options, ctx.baseUrl, ctx.headers);
    },
    getByPathogenType(pathogenType, options = {}) {
      return run('surveillance', qb.eq('pathogen_type', pathogenType), options, ctx.baseUrl, ctx.headers);
    },
    getByGenomeId(genomeId, options = {}) {
      return run('surveillance', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },
    getBySequenceAccession(sequenceAccession, options = {}) {
      return run('surveillance', qb.eq('sequence_accession', sequenceAccession), options, ctx.baseUrl, ctx.headers);
    },
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('surveillance', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    // Disease-related methods
    getByDiseaseStatus(diseaseStatus, options = {}) {
      return run('surveillance', qb.eq('disease_status', diseaseStatus), options, ctx.baseUrl, ctx.headers);
    },
    getByDiseaseSeverity(diseaseSeverity, options = {}) {
      return run('surveillance', qb.eq('disease_severity', diseaseSeverity), options, ctx.baseUrl, ctx.headers);
    },
    getByDiagnosis(diagnosis, options = {}) {
      return run('surveillance', qb.eq('diagnosis', diagnosis), options, ctx.baseUrl, ctx.headers);
    },
    getBySymptoms(symptoms, options = {}) {
      return run('surveillance', qb.eq('symptoms', symptoms), options, ctx.baseUrl, ctx.headers);
    },
    getBySuddenOnset(suddenOnset, options = {}) {
      return run('surveillance', qb.eq('sudden_onset', suddenOnset), options, ctx.baseUrl, ctx.headers);
    },
    getByOnsetHours(onsetHours, options = {}) {
      return run('surveillance', qb.eq('onset_hours', onsetHours), options, ctx.baseUrl, ctx.headers);
    },

    // Treatment-related methods
    getByTreatment(treatment, options = {}) {
      return run('surveillance', qb.eq('treatment', treatment), options, ctx.baseUrl, ctx.headers);
    },
    getByTreatmentType(treatmentType, options = {}) {
      return run('surveillance', qb.eq('treatment_type', treatmentType), options, ctx.baseUrl, ctx.headers);
    },
    getByTreatmentDosage(treatmentDosage, options = {}) {
      return run('surveillance', qb.eq('treatment_dosage', treatmentDosage), options, ctx.baseUrl, ctx.headers);
    },
    getByDurationOfTreatment(durationOfTreatment, options = {}) {
      return run('surveillance', qb.eq('duration_of_treatment', durationOfTreatment), options, ctx.baseUrl, ctx.headers);
    },
    getByInitiationOfTreatment(initiationOfTreatment, options = {}) {
      return run('surveillance', qb.eq('initiation_of_treatment', initiationOfTreatment), options, ctx.baseUrl, ctx.headers);
    },
    getByPreVisitMedications(preVisitMedications, options = {}) {
      return run('surveillance', qb.eq('pre_visit_medications', preVisitMedications), options, ctx.baseUrl, ctx.headers);
    },
    getByPostVisitMedications(postVisitMedications, options = {}) {
      return run('surveillance', qb.eq('post_visit_medications', postVisitMedications), options, ctx.baseUrl, ctx.headers);
    },
    getByMaintenanceMedication(maintenanceMedication, options = {}) {
      return run('surveillance', qb.eq('maintenance_medication', maintenanceMedication), options, ctx.baseUrl, ctx.headers);
    },

    // Hospitalization-related methods
    getByHospitalized(hospitalized, options = {}) {
      return run('surveillance', qb.eq('hospitalized', hospitalized), options, ctx.baseUrl, ctx.headers);
    },
    getByHospitalizationDuration(hospitalizationDuration, options = {}) {
      return run('surveillance', qb.eq('hospitalization_duration', hospitalizationDuration), options, ctx.baseUrl, ctx.headers);
    },
    getByIntensiveCareUnit(intensiveCareUnit, options = {}) {
      return run('surveillance', qb.eq('intensive_care_unit', intensiveCareUnit), options, ctx.baseUrl, ctx.headers);
    },
    getByEcmo(ecmo, options = {}) {
      return run('surveillance', qb.eq('ecmo', ecmo), options, ctx.baseUrl, ctx.headers);
    },
    getByVentilation(ventilation, options = {}) {
      return run('surveillance', qb.eq('ventilation', ventilation), options, ctx.baseUrl, ctx.headers);
    },
    getByOxygenSaturation(oxygenSaturation, options = {}) {
      return run('surveillance', qb.eq('oxygen_saturation', oxygenSaturation), options, ctx.baseUrl, ctx.headers);
    },

    // Vaccination-related methods
    getByVaccinationType(vaccinationType, options = {}) {
      return run('surveillance', qb.eq('vaccination_type', vaccinationType), options, ctx.baseUrl, ctx.headers);
    },
    getByVaccineDosage(vaccineDosage, options = {}) {
      return run('surveillance', qb.eq('vaccine_dosage', vaccineDosage), options, ctx.baseUrl, ctx.headers);
    },
    getByVaccineLotNumber(vaccineLotNumber, options = {}) {
      return run('surveillance', qb.eq('vaccine_lot_number', vaccineLotNumber), options, ctx.baseUrl, ctx.headers);
    },
    getByVaccineManufacturer(vaccineManufacturer, options = {}) {
      return run('surveillance', qb.eq('vaccine_manufacturer', vaccineManufacturer), options, ctx.baseUrl, ctx.headers);
    },
    getByDaysElapsedToVaccination(daysElapsedToVaccination, options = {}) {
      return run('surveillance', qb.eq('days_elapsed_to_vaccination', daysElapsedToVaccination), options, ctx.baseUrl, ctx.headers);
    },
    getBySourceOfVaccineInformation(sourceOfVaccineInformation, options = {}) {
      return run('surveillance', qb.eq('source_of_vaccine_information', sourceOfVaccineInformation), options, ctx.baseUrl, ctx.headers);
    },
    getByOtherVaccinations(otherVaccinations, options = {}) {
      return run('surveillance', qb.eq('other_vaccinations', otherVaccinations), options, ctx.baseUrl, ctx.headers);
    },

    // Exposure-related methods
    getByExposure(exposure, options = {}) {
      return run('surveillance', qb.eq('exposure', exposure), options, ctx.baseUrl, ctx.headers);
    },
    getByExposureType(exposureType, options = {}) {
      return run('surveillance', qb.eq('exposure_type', exposureType), options, ctx.baseUrl, ctx.headers);
    },
    getByDurationOfExposure(durationOfExposure, options = {}) {
      return run('surveillance', qb.eq('duration_of_exposure', durationOfExposure), options, ctx.baseUrl, ctx.headers);
    },
    getByUseOfPersonalProtectiveEquipment(useOfPersonalProtectiveEquipment, options = {}) {
      return run('surveillance', qb.eq('use_of_personal_protective_equipment', useOfPersonalProtectiveEquipment), options, ctx.baseUrl, ctx.headers);
    },

    // Lifestyle and health-related methods
    getByTobaccoUse(tobaccoUse, options = {}) {
      return run('surveillance', qb.eq('tobacco_use', tobaccoUse), options, ctx.baseUrl, ctx.headers);
    },
    getByPacksPerDayForHowManyYears(packsPerDayForHowManyYears, options = {}) {
      return run('surveillance', qb.eq('packs_per_day_for_how_many_years', packsPerDayForHowManyYears), options, ctx.baseUrl, ctx.headers);
    },
    getByAlcoholOrOtherDrugDependence(alcoholOrOtherDrugDependence, options = {}) {
      return run('surveillance', qb.eq('alcohol_or_other_drug_dependence', alcoholOrOtherDrugDependence), options, ctx.baseUrl, ctx.headers);
    },
    getByBreastfeeding(breastfeeding, options = {}) {
      return run('surveillance', qb.eq('breastfeeding', breastfeeding), options, ctx.baseUrl, ctx.headers);
    },
    getByPregnancy(pregnancy, options = {}) {
      return run('surveillance', qb.eq('pregnancy', pregnancy), options, ctx.baseUrl, ctx.headers);
    },
    getByTrimesterOfPregnancy(trimesterOfPregnancy, options = {}) {
      return run('surveillance', qb.eq('trimester_of_pregnancy', trimesterOfPregnancy), options, ctx.baseUrl, ctx.headers);
    },
    getByDaycareAttendance(daycareAttendance, options = {}) {
      return run('surveillance', qb.eq('daycare_attendance', daycareAttendance), options, ctx.baseUrl, ctx.headers);
    },
    getByNursingHomeResidence(nursingHomeResidence, options = {}) {
      return run('surveillance', qb.eq('nursing_home_residence', nursingHomeResidence), options, ctx.baseUrl, ctx.headers);
    },
    getByPrimaryLivingSituation(primaryLivingSituation, options = {}) {
      return run('surveillance', qb.eq('primary_living_situation', primaryLivingSituation), options, ctx.baseUrl, ctx.headers);
    },
    getByEducation(education, options = {}) {
      return run('surveillance', qb.eq('education', education), options, ctx.baseUrl, ctx.headers);
    },
    getByProfession(profession, options = {}) {
      return run('surveillance', qb.eq('profession', profession), options, ctx.baseUrl, ctx.headers);
    },
    getByChronicConditions(chronicConditions, options = {}) {
      return run('surveillance', qb.eq('chronic_conditions', chronicConditions), options, ctx.baseUrl, ctx.headers);
    },
    getByInfectionsWithinFiveYears(infectionsWithinFiveYears, options = {}) {
      return run('surveillance', qb.eq('infections_within_five_years', infectionsWithinFiveYears), options, ctx.baseUrl, ctx.headers);
    },
    getByInfluenzaLikeIllnessOverThePastYear(influenzaLikeIllnessOverThePastYear, options = {}) {
      return run('surveillance', qb.eq('influenza_like_illness_over_the_past_year', influenzaLikeIllnessOverThePastYear), options, ctx.baseUrl, ctx.headers);
    },
    getByTypesOfAllergies(typesOfAllergies, options = {}) {
      return run('surveillance', qb.eq('types_of_allergies', typesOfAllergies), options, ctx.baseUrl, ctx.headers);
    },
    getByDialysis(dialysis, options = {}) {
      return run('surveillance', qb.eq('dialysis', dialysis), options, ctx.baseUrl, ctx.headers);
    },
    getByHumanLeukocyteAntigens(humanLeukocyteAntigens, options = {}) {
      return run('surveillance', qb.eq('human_leukocyte_antigens', humanLeukocyteAntigens), options, ctx.baseUrl, ctx.headers);
    },
    getByLongitudinalStudy(longitudinalStudy, options = {}) {
      return run('surveillance', qb.eq('longitudinal_study', longitudinalStudy), options, ctx.baseUrl, ctx.headers);
    },
    getByTravelHistory(travelHistory, options = {}) {
      return run('surveillance', qb.eq('travel_history', travelHistory), options, ctx.baseUrl, ctx.headers);
    },
    getByGeographicGroup(geographicGroup, options = {}) {
      return run('surveillance', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
    },

    // Test-related methods
    getByPathogenTestType(pathogenTestType, options = {}) {
      return run('surveillance', qb.eq('pathogen_test_type', pathogenTestType), options, ctx.baseUrl, ctx.headers);
    },
    getByPathogenTestResult(pathogenTestResult, options = {}) {
      return run('surveillance', qb.eq('pathogen_test_result', pathogenTestResult), options, ctx.baseUrl, ctx.headers);
    },
    getByPathogenTestInterpretation(pathogenTestInterpretation, options = {}) {
      return run('surveillance', qb.eq('pathogen_test_interpretation', pathogenTestInterpretation), options, ctx.baseUrl, ctx.headers);
    },
    getByChestImagingInterpretation(chestImagingInterpretation, options = {}) {
      return run('surveillance', qb.eq('chest_imaging_interpretation', chestImagingInterpretation), options, ctx.baseUrl, ctx.headers);
    },

    // Date range methods
    getByCollectionDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('collection_date', startDate), qb.lte('collection_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getBySubmissionDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('submission_date', startDate), qb.lte('submission_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByLastUpdateDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('last_update_date', startDate), qb.lte('last_update_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByEmbargoEndDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('embargo_end_date', startDate), qb.lte('embargo_end_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    // Location range methods
    getByCollectionLatitudeRange(minLat, maxLat, options = {}) {
      return run('surveillance', qb.and(qb.gte('collection_latitude', minLat), qb.lte('collection_latitude', maxLat)), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionLongitudeRange(minLon, maxLon, options = {}) {
      return run('surveillance', qb.and(qb.gte('collection_longitude', minLon), qb.lte('collection_longitude', maxLon)), options, ctx.baseUrl, ctx.headers);
    },

    // Time-related methods
    getByDaysElapsedToDiseaseStatus(daysElapsedToDiseaseStatus, options = {}) {
      return run('surveillance', qb.eq('days_elapsed_to_disease_status', daysElapsedToDiseaseStatus), options, ctx.baseUrl, ctx.headers);
    },
    getByDaysElapsedToSampleCollection(daysElapsedToSampleCollection, options = {}) {
      return run('surveillance', qb.eq('days_elapsed_to_sample_collection', daysElapsedToSampleCollection), options, ctx.baseUrl, ctx.headers);
    },

    // Metadata methods
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('surveillance', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },
    getByComments(comments, options = {}) {
      return run('surveillance', qb.eq('comments', comments), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectorName(collectorName, options = {}) {
      return run('surveillance', qb.eq('collector_name', collectorName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search surveillance data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of surveillance data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('surveillance', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all surveillance data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of surveillance data objects
     */
    getAll(options = {}) {
      return run('surveillance', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 