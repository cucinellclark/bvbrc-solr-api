// Public entry: client factory + backward compatible helpers
import { createContext } from './core/httpClient.js';
import { genome as genomeResource } from './resources/genome.js';
import { genomeFeature as genomeFeatureResource } from './resources/genome_feature.js';
import { antibiotics as antibioticsResource } from './resources/antibiotics.js';

// Factory client to access all resources with custom context
export function createClient(contextOverrides = {}) {
  const ctx = createContext(contextOverrides);
  return {
    genome: genomeResource(ctx),
    genome_feature: genomeFeatureResource(ctx),
    antibiotics: antibioticsResource(ctx),
  };
}

// Default client used by convenience functions
const defaultClient = createClient();

// Backward compatible convenience exports
export function getGenome(id, options = {}) {
  return defaultClient.genome.getById(id, options);
}

export function queryGenomeBy(filters = {}, options = {}) {
  return defaultClient.genome.queryBy(filters, options);
}

// Genome convenience functions
export function getGenomeByTaxonId(taxonId, options = {}) {
  return defaultClient.genome.getByTaxonId(taxonId, options);
}

export function getGenomeByOrganismName(organismName, options = {}) {
  return defaultClient.genome.getByOrganismName(organismName, options);
}

export function getGenomeByGenomeName(genomeName, options = {}) {
  return defaultClient.genome.getByGenomeName(genomeName, options);
}

export function getGenomeByStrain(strain, options = {}) {
  return defaultClient.genome.getByStrain(strain, options);
}

export function getGenomeBySpecies(species, options = {}) {
  return defaultClient.genome.getBySpecies(species, options);
}

export function getGenomeByGenus(genus, options = {}) {
  return defaultClient.genome.getByGenus(genus, options);
}

export function getGenomeByFamily(family, options = {}) {
  return defaultClient.genome.getByFamily(family, options);
}

export function getGenomeByOrder(order, options = {}) {
  return defaultClient.genome.getByOrder(order, options);
}

export function getGenomeByClass(className, options = {}) {
  return defaultClient.genome.getByClass(className, options);
}

export function getGenomeByPhylum(phylum, options = {}) {
  return defaultClient.genome.getByPhylum(phylum, options);
}

export function getGenomeByKingdom(kingdom, options = {}) {
  return defaultClient.genome.getByKingdom(kingdom, options);
}

export function getGenomeBySuperkingdom(superkingdom, options = {}) {
  return defaultClient.genome.getBySuperkingdom(superkingdom, options);
}

export function getGenomeByGenomeStatus(genomeStatus, options = {}) {
  return defaultClient.genome.getByGenomeStatus(genomeStatus, options);
}

export function getGenomeByGenomeQuality(genomeQuality, options = {}) {
  return defaultClient.genome.getByGenomeQuality(genomeQuality, options);
}

export function getGenomeByAssemblyAccession(assemblyAccession, options = {}) {
  return defaultClient.genome.getByAssemblyAccession(assemblyAccession, options);
}

export function getGenomeByBioprojectAccession(bioprojectAccession, options = {}) {
  return defaultClient.genome.getByBioprojectAccession(bioprojectAccession, options);
}

export function getGenomeByBiosampleAccession(biosampleAccession, options = {}) {
  return defaultClient.genome.getByBiosampleAccession(biosampleAccession, options);
}

export function getGenomeBySraAccession(sraAccession, options = {}) {
  return defaultClient.genome.getBySraAccession(sraAccession, options);
}

export function getGenomeByRefseqAccessions(refseqAccessions, options = {}) {
  return defaultClient.genome.getByRefseqAccessions(refseqAccessions, options);
}

export function getGenomeByGenbankAccessions(genbankAccessions, options = {}) {
  return defaultClient.genome.getByGenbankAccessions(genbankAccessions, options);
}

export function getGenomeByGramStain(gramStain, options = {}) {
  return defaultClient.genome.getByGramStain(gramStain, options);
}

export function getGenomeByMotility(motility, options = {}) {
  return defaultClient.genome.getByMotility(motility, options);
}

export function getGenomeByOxygenRequirement(oxygenRequirement, options = {}) {
  return defaultClient.genome.getByOxygenRequirement(oxygenRequirement, options);
}

export function getGenomeByHabitat(habitat, options = {}) {
  return defaultClient.genome.getByHabitat(habitat, options);
}

export function getGenomeByIsolationCountry(isolationCountry, options = {}) {
  return defaultClient.genome.getByIsolationCountry(isolationCountry, options);
}

export function getGenomeByIsolationSource(isolationSource, options = {}) {
  return defaultClient.genome.getByIsolationSource(isolationSource, options);
}

export function getGenomeByGeographicLocation(geographicLocation, options = {}) {
  return defaultClient.genome.getByGeographicLocation(geographicLocation, options);
}

export function getGenomeByGeographicGroup(geographicGroup, options = {}) {
  return defaultClient.genome.getByGeographicGroup(geographicGroup, options);
}

export function getGenomeByCellShape(cellShape, options = {}) {
  return defaultClient.genome.getByCellShape(cellShape, options);
}

export function getGenomeBySporulation(sporulation, options = {}) {
  return defaultClient.genome.getBySporulation(sporulation, options);
}

export function getGenomeByOptimalTemperature(optimalTemperature, options = {}) {
  return defaultClient.genome.getByOptimalTemperature(optimalTemperature, options);
}

export function getGenomeByTemperatureRange(temperatureRange, options = {}) {
  return defaultClient.genome.getByTemperatureRange(temperatureRange, options);
}

export function getGenomeBySalinity(salinity, options = {}) {
  return defaultClient.genome.getBySalinity(salinity, options);
}

export function getGenomeByDepth(depth, options = {}) {
  return defaultClient.genome.getByDepth(depth, options);
}

export function getGenomeByAltitude(altitude, options = {}) {
  return defaultClient.genome.getByAltitude(altitude, options);
}

export function getGenomeByTypeStrain(typeStrain, options = {}) {
  return defaultClient.genome.getByTypeStrain(typeStrain, options);
}

export function getGenomeBySerovar(serovar, options = {}) {
  return defaultClient.genome.getBySerovar(serovar, options);
}

export function getGenomeByPathovar(pathovar, options = {}) {
  return defaultClient.genome.getByPathovar(pathovar, options);
}

export function getGenomeByBiovar(biovar, options = {}) {
  return defaultClient.genome.getByBiovar(biovar, options);
}

export function getGenomeByClade(clade, options = {}) {
  return defaultClient.genome.getByClade(clade, options);
}

export function getGenomeBySubclade(subclade, options = {}) {
  return defaultClient.genome.getBySubclade(subclade, options);
}

export function getGenomeBySubtype(subtype, options = {}) {
  return defaultClient.genome.getBySubtype(subtype, options);
}

export function getGenomeByLineage(lineage, options = {}) {
  return defaultClient.genome.getByLineage(lineage, options);
}

export function getGenomeByMlst(mlst, options = {}) {
  return defaultClient.genome.getByMlst(mlst, options);
}

export function getGenomeBySequencingPlatform(sequencingPlatform, options = {}) {
  return defaultClient.genome.getBySequencingPlatform(sequencingPlatform, options);
}

export function getGenomeByAssemblyMethod(assemblyMethod, options = {}) {
  return defaultClient.genome.getByAssemblyMethod(assemblyMethod, options);
}

export function getGenomeByGenomeLengthRange(minLength, maxLength, options = {}) {
  return defaultClient.genome.getByGenomeLengthRange(minLength, maxLength, options);
}

export function getGenomeByGcContentRange(minGc, maxGc, options = {}) {
  return defaultClient.genome.getByGcContentRange(minGc, maxGc, options);
}

export function getGenomeByCdsCountRange(minCds, maxCds, options = {}) {
  return defaultClient.genome.getByCdsCountRange(minCds, maxCds, options);
}

export function getGenomeByContigCountRange(minContigs, maxContigs, options = {}) {
  return defaultClient.genome.getByContigCountRange(minContigs, maxContigs, options);
}

export function getGenomeByCollectionYearRange(startYear, endYear, options = {}) {
  return defaultClient.genome.getByCollectionYearRange(startYear, endYear, options);
}

export function getGenomeByDateRange(startDate, endDate, options = {}) {
  return defaultClient.genome.getByDateRange(startDate, endDate, options);
}

export function getGenomeByPublicStatus(isPublic, options = {}) {
  return defaultClient.genome.getByPublicStatus(isPublic, options);
}

export function getAllGenomes(options = {}) {
  return defaultClient.genome.getAll(options);
}

export function getGenomeFeature(id, options = {}) {
  return defaultClient.genome_feature.getById(id, options);
}

export function queryGenomeFeatureBy(filters = {}, options = {}) {
  return defaultClient.genome_feature.queryBy(filters, options);
}

// Genome Feature convenience functions
export function getGenomeFeatureByGenomeId(genomeId, options = {}) {
  return defaultClient.genome_feature.getByGenomeId(genomeId, options);
}

export function getGenomeFeatureByGenomeName(genomeName, options = {}) {
  return defaultClient.genome_feature.getByGenomeName(genomeName, options);
}

export function getGenomeFeatureByGene(geneName, options = {}) {
  return defaultClient.genome_feature.getByGene(geneName, options);
}

export function getGenomeFeatureByProduct(productName, options = {}) {
  return defaultClient.genome_feature.getByProduct(productName, options);
}

export function getGenomeFeatureByFeatureType(featureType, options = {}) {
  return defaultClient.genome_feature.getByFeatureType(featureType, options);
}

export function getGenomeFeatureByAnnotation(annotationType, options = {}) {
  return defaultClient.genome_feature.getByAnnotation(annotationType, options);
}

export function getGenomeFeatureByPatricId(patricId, options = {}) {
  return defaultClient.genome_feature.getByPatricId(patricId, options);
}

export function getGenomeFeatureByProteinId(proteinId, options = {}) {
  return defaultClient.genome_feature.getByProteinId(proteinId, options);
}

export function getGenomeFeatureByAccession(accession, options = {}) {
  return defaultClient.genome_feature.getByAccession(accession, options);
}

export function getGenomeFeatureByUniprotAccession(uniprotAccession, options = {}) {
  return defaultClient.genome_feature.getByUniprotAccession(uniprotAccession, options);
}

export function getGenomeFeatureByGoTerm(goTerm, options = {}) {
  return defaultClient.genome_feature.getByGoTerm(goTerm, options);
}

export function getGenomeFeatureByStrand(strand, options = {}) {
  return defaultClient.genome_feature.getByStrand(strand, options);
}

export function getGenomeFeatureByLocationRange(start, end, options = {}) {
  return defaultClient.genome_feature.getByLocationRange(start, end, options);
}

export function getGenomeFeatureBySequenceLengthRange(minLength, maxLength, options = {}) {
  return defaultClient.genome_feature.getBySequenceLengthRange(minLength, maxLength, options);
}

export function getGenomeFeatureByProteinLengthRange(minLength, maxLength, options = {}) {
  return defaultClient.genome_feature.getByProteinLengthRange(minLength, maxLength, options);
}

export function getGenomeFeatureByPublicStatus(isPublic, options = {}) {
  return defaultClient.genome_feature.getByPublicStatus(isPublic, options);
}

export function getAllGenomeFeatures(options = {}) {
  return defaultClient.genome_feature.getAll(options);
}

// Antibiotics convenience functions
export function getAntibiotic(pubchemCid, options = {}) {
  return defaultClient.antibiotics.getByPubchemCid(pubchemCid, options);
}

export function queryAntibioticsBy(filters = {}, options = {}) {
  return defaultClient.antibiotics.queryBy(filters, options);
}

export function searchAntibioticsByKeyword(keyword, options = {}) {
  return defaultClient.antibiotics.searchByKeyword(keyword, options);
}

export function getAntibioticByName(antibioticName, options = {}) {
  return defaultClient.antibiotics.getByAntibioticName(antibioticName, options);
}

export function getAntibioticByCasId(casId, options = {}) {
  return defaultClient.antibiotics.getByCasId(casId, options);
}

export function getAntibioticByMolecularFormula(molecularFormula, options = {}) {
  return defaultClient.antibiotics.getByMolecularFormula(molecularFormula, options);
}

export function getAntibioticByAtcClassification(atcClassification, options = {}) {
  return defaultClient.antibiotics.getByAtcClassification(atcClassification, options);
}

export function getAntibioticByMechanismOfAction(mechanismOfAction, options = {}) {
  return defaultClient.antibiotics.getByMechanismOfAction(mechanismOfAction, options);
}

export function getAntibioticByPharmacologicalClass(pharmacologicalClass, options = {}) {
  return defaultClient.antibiotics.getByPharmacologicalClass(pharmacologicalClass, options);
}

export function getAntibioticBySynonym(synonym, options = {}) {
  return defaultClient.antibiotics.getBySynonym(synonym, options);
}

export function getAllAntibiotics(options = {}) {
  return defaultClient.antibiotics.getAll(options);
}

// Generic query kept for power users (uses base context)
import { run as runInternal } from './core/httpClient.js';
export async function query(core, filter = '', options = {}) {
  const ctx = createContext();
  return runInternal(core, filter, options, ctx.baseUrl, ctx.headers);
}

export default {
  createClient,
  getGenome,
  queryGenomeBy,
  getGenomeByTaxonId,
  getGenomeByOrganismName,
  getGenomeByGenomeName,
  getGenomeByStrain,
  getGenomeBySpecies,
  getGenomeByGenus,
  getGenomeByFamily,
  getGenomeByOrder,
  getGenomeByClass,
  getGenomeByPhylum,
  getGenomeByKingdom,
  getGenomeBySuperkingdom,
  getGenomeByGenomeStatus,
  getGenomeByGenomeQuality,
  getGenomeByAssemblyAccession,
  getGenomeByBioprojectAccession,
  getGenomeByBiosampleAccession,
  getGenomeBySraAccession,
  getGenomeByRefseqAccessions,
  getGenomeByGenbankAccessions,
  getGenomeByGramStain,
  getGenomeByMotility,
  getGenomeByOxygenRequirement,
  getGenomeByHabitat,
  getGenomeByIsolationCountry,
  getGenomeByIsolationSource,
  getGenomeByGeographicLocation,
  getGenomeByGeographicGroup,
  getGenomeByCellShape,
  getGenomeBySporulation,
  getGenomeByOptimalTemperature,
  getGenomeByTemperatureRange,
  getGenomeBySalinity,
  getGenomeByDepth,
  getGenomeByAltitude,
  getGenomeByTypeStrain,
  getGenomeBySerovar,
  getGenomeByPathovar,
  getGenomeByBiovar,
  getGenomeByClade,
  getGenomeBySubclade,
  getGenomeBySubtype,
  getGenomeByLineage,
  getGenomeByMlst,
  getGenomeBySequencingPlatform,
  getGenomeByAssemblyMethod,
  getGenomeByGenomeLengthRange,
  getGenomeByGcContentRange,
  getGenomeByCdsCountRange,
  getGenomeByContigCountRange,
  getGenomeByCollectionYearRange,
  getGenomeByDateRange,
  getGenomeByPublicStatus,
  getAllGenomes,
  getGenomeFeature,
  queryGenomeFeatureBy,
  getGenomeFeatureByGenomeId,
  getGenomeFeatureByGenomeName,
  getGenomeFeatureByGene,
  getGenomeFeatureByProduct,
  getGenomeFeatureByFeatureType,
  getGenomeFeatureByAnnotation,
  getGenomeFeatureByPatricId,
  getGenomeFeatureByProteinId,
  getGenomeFeatureByAccession,
  getGenomeFeatureByUniprotAccession,
  getGenomeFeatureByGoTerm,
  getGenomeFeatureByStrand,
  getGenomeFeatureByLocationRange,
  getGenomeFeatureBySequenceLengthRange,
  getGenomeFeatureByProteinLengthRange,
  getGenomeFeatureByPublicStatus,
  getAllGenomeFeatures,
  getAntibiotic,
  queryAntibioticsBy,
  searchAntibioticsByKeyword,
  getAntibioticByName,
  getAntibioticByCasId,
  getAntibioticByMolecularFormula,
  getAntibioticByAtcClassification,
  getAntibioticByMechanismOfAction,
  getAntibioticByPharmacologicalClass,
  getAntibioticBySynonym,
  getAllAntibiotics,
  query,
};

