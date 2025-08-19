// Public entry: client factory + generic query
import { createContext, run as runInternal } from './core/httpClient.js';
import { setAuthToken, getAuthToken, setConfig, getConfig } from './core/config.js';
import { antibiotics as antibioticsResource } from './resources/antibiotics.js';
import { bioset as biosetResource } from './resources/bioset.js';
import { bioset_result as biosetResultResource } from './resources/bioset_result.js';
import { enzyme_class_ref as enzymeClassRefResource } from './resources/enzyme_class_ref.js';
import { epitope as epitopeResource } from './resources/epitope.js';
import { epitopeAssay as epitopeAssayResource } from './resources/epitope_assay.js';
import { experiment as experimentResource } from './resources/experiment.js';
import { gene_ontology_ref as geneOntologyRefResource } from './resources/gene_ontology_ref.js';
import { genome as genomeResource } from './resources/genome.js';
import { genomeAmr as genomeAmrResource } from './resources/genome_amr.js';
import { genomeFeature as genomeFeatureResource } from './resources/genome_feature.js';
import { genomeSequence as genomeSequenceResource } from './resources/genome_sequence.js';
import { idRef as idRefResource } from './resources/id_ref.js';
import { miscNiaidSgc as miscNiaidSgcResource } from './resources/misc_niaid_sgc.js';
import { pathway as pathwayResource } from './resources/pathway.js';
import { pathway_ref as pathwayRefResource } from './resources/pathway_ref.js';
import { ppi as ppiResource } from './resources/ppi.js';
import { protein_feature as proteinFeatureResource } from './resources/protein_feature.js';
import { proteinFamilyRef as proteinFamilyRefResource } from './resources/protein_family_ref.js';
import { protein_structure as proteinStructureResource } from './resources/protein_structure.js';
import { sequenceFeature as sequenceFeatureResource } from './resources/sequence_feature.js';
import { sequence_feature_vt as sequenceFeatureVtResource } from './resources/sequence_feature_vt.js';
import { serology as serologyResource } from './resources/serology.js';
import { sp_gene as spGeneResource } from './resources/sp_gene.js';
import { spGeneRef as spGeneRefResource } from './resources/sp_gene_ref.js';
import { spikeLineage as spikeLineageResource } from './resources/spike_lineage.js';
import { spikeVariant as spikeVariantResource } from './resources/spike_variant.js';
import { strain as strainResource } from './resources/strain.js';
import { structured_assertion as structuredAssertionResource } from './resources/structured_assertion.js';
import { subsystem as subsystemResource } from './resources/subsystem.js';
import { subsystemRef as subsystemRefResource } from './resources/subsystem_ref.js';
import { surveillance as surveillanceResource } from './resources/surveillance.js';
import { taxonomy as taxonomyResource } from './resources/taxonomy.js';

// Factory client to access all resources with custom context
export function createClient(contextOverrides = {}) {
  const ctx = createContext(contextOverrides);
  return {
    antibiotics: antibioticsResource(ctx),
    bioset: biosetResource(ctx),
    bioset_result: biosetResultResource(ctx),
    enzyme_class_ref: enzymeClassRefResource(ctx),
    epitope: epitopeResource(ctx),
    epitope_assay: epitopeAssayResource(ctx),
    experiment: experimentResource(ctx),
    gene_ontology_ref: geneOntologyRefResource(ctx),
    genome: genomeResource(ctx),
    genome_amr: genomeAmrResource(ctx),
    genome_feature: genomeFeatureResource(ctx),
    genome_sequence: genomeSequenceResource(ctx),
    id_ref: idRefResource(ctx),
    misc_niaid_sgc: miscNiaidSgcResource(ctx),
    pathway: pathwayResource(ctx),
    pathway_ref: pathwayRefResource(ctx),
    ppi: ppiResource(ctx),
    protein_feature: proteinFeatureResource(ctx),
    protein_family_ref: proteinFamilyRefResource(ctx),
    protein_structure: proteinStructureResource(ctx),
    sequence_feature: sequenceFeatureResource(ctx),
    sequence_feature_vt: sequenceFeatureVtResource(ctx),
    serology: serologyResource(ctx),
    sp_gene: spGeneResource(ctx),
    sp_gene_ref: spGeneRefResource(ctx),
    spike_lineage: spikeLineageResource(ctx),
    spike_variant: spikeVariantResource(ctx),
    strain: strainResource(ctx),
    structured_assertion: structuredAssertionResource(ctx),
    subsystem: subsystemResource(ctx),
    subsystem_ref: subsystemRefResource(ctx),
    surveillance: surveillanceResource(ctx),
    taxonomy: taxonomyResource(ctx),
  };
}

// Generic query function for power users (uses base context)
export async function query(core, filter = '', options = {}) {
  const ctx = createContext();
  return runInternal(core, filter, options, ctx.baseUrl, ctx.headers);
}

export default {
  createClient,
  query,
  // Configuration functions
  setAuthToken,
  getAuthToken,
  setConfig,
  getConfig,
};

