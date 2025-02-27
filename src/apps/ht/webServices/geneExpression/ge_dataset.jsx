import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(id_dataset) {
  return gql`
  {
    getAllGeneExpressionOfDataset(datasetId: "${id_dataset}" ) {
      _id
      datasetIds
      gene {
        _id
        name
        synonyms
        bnumber
      }
      count
      tpm
      fpkm
      temporalId
    }
  }
    `
}

const GetGE = ({
  id_dataset = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(id_dataset))
  //console.log(id_dataset)
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      try {
        if (data.getAllGeneExpressionOfDataset.length > 0) {
          status('done')
        } else {
          status('no_results')
        }
        
        resoultsData(data?.getAllGeneExpressionOfDataset)

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

  }, [loading, error, status, data, resoultsData, id_dataset]);
  return (<></>);
}

export default GetGE;