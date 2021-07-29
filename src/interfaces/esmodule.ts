export interface CommonName {
  three_letter_code?: string;
  name?: string;
  language_name?: string;
  id?: number; // int32
  language_id?: number; // int32
}

export interface ExtendedTaxonDefinition {
  parent_taxon_definition_id?: number; // int32
  group_name?: string;
  accepted_ids?: number /* int32 */[];
  hierarchy?: string;
  italicised_form?: string;
  species_id?: number; // int32
  species_title?: string;
  path?: string;
  repr_image_id?: string;
  repr_image_url?: string;
  group_id?: number; // float
  name?: string;
  common_names?: CommonName[];
  rank?: string;
  id?: number; // int32
  position?: string;
  lowercase_match_name?: string;
  canonical_form?: string;
  status?: string;
  accepted_names?: string[];
}
