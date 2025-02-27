import React, { useEffect } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


function query(ht_query) {
  try {
    return gql`
  {
      getDatasetsFromSearch(advancedSearch: "${ht_query}") {
        _id
          publication {
            pmid
            doi
            authors
            title
            date
            pmcid
          }
          fivePrimeEnrichment
          objectTested {
            _id
            name
            synonyms
            genes {
              _id
              name
            }
            note
            activeConformations
            externalCrossReferences {
              externalCrossReferenceId
              externalCrossReferenceName
              objectId
              url
            }
          }
          sourceSerie {
            sourceId
            sourceName
            title
            platformId
            platformTitle
            strategy
            method
          }
          sample {
            experimentId
            controlId
            title
          }
          linkedDataset {
            controlId
            experimentId
            datasetType
          }
          referenceGenome
          datasetType
          temporalId
          growthConditions {
            organism
            geneticBackground
            medium
            mediumSupplements
            aeration
            temperature
            ph
            pressure
            opticalDensity
            growthPhase
            growthRate
            vesselType
            aerationSpeed
          }
          releaseDataControl {
            date
            version
          }
        }
      }
      `
  } catch (error) {
    console.log(error)
  }
  return gql`{
    getDatasetsFromSearch(advancedSearch: "a[]") {
      datasetID
    }
  }`

}

const GetResultsDataset = ({
  ht_query = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(ht_query))
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {

      try {
        resoultsData(data?.getDatasetsFromSearch)
        status('done')
      } catch (error) {
        resoultsData(undefined)
        status('error')
        console.error(error)
      }
    }
    if (error) {
      resoultsData(undefined)
      status('error')
      console.error(error)
    }

  }, [loading, error, status, data, resoultsData, ht_query]);
  return (<></>);
}

export default GetResultsDataset;