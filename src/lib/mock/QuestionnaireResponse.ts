const questionnaireResponses = [
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270321/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270321",
      "meta": {
        "versionId": "4",
        "lastUpdated": "2023-06-20T19:12:05.296Z",
        "source": "#Qi0wwIGKlSDOZBt4",
        "profile": [
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse|2.7"
        ],
        "tag": [
          {
            "code": "lformsVersion: 30.0.0-beta.6"
          }
        ]
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/7199499"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/59525",
      "status": "completed",
      "item": [
        {
          "linkId": "1",
          "answer": [
            {
              "valueString": "New Value",
              "valueBoolean": true
            }
          ],
          "text": "Do you have allergies?"
        },
        {
          "linkId": "2",
          "answer": [
            {
              "valueString": "asd"
            }
          ]
        },
        {
          "linkId": "3",
          "answer": [
            {
              "valueString": "qwd"
            }
          ]
        }
      ],
      "authored": "2023-06-20T19:12:05.296Z"
    },
    "search": {
      "mode": "match"
    }
  },
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270307/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270307",
      "meta": {
        "versionId": "1",
        "lastUpdated": "2023-01-09T21:09:29.718+00:00",
        "source": "#xOcKFtTfZXY20XDE"
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/7221072"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/63500",
      "status": "in-progress",
      "item": [
        {
          "linkId": "/43149-4",
          "answer": [
            {
              "valueString": "Wert XY 1"
            }
          ]
        }
      ]
    },
    "search": {
      "mode": "match"
    }
  },
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270308/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270308",
      "meta": {
        "versionId": "30",
        "lastUpdated": "2023-02-15T16:53:06.929+00:00",
        "source": "#PlYphhpHoWiNA2ji"
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/7221072"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/66609",
      "status": "in-progress",
      "item": [
        {
          "linkId": "/29463-7",
          "answer": [
            {
              "valueString": "123"
            }
          ]
        },
        {
          "linkId": "/8352-7",
          "answer": [
            {
              "valueString": "21"
            }
          ]
        }
      ]
    },
    "search": {
      "mode": "match"
    }
  },
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270343/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270343",
      "meta": {
        "versionId": "1",
        "lastUpdated": "2023-06-20T06:48:58.778Z",
        "source": "#9h5y5ShnkGj0JTrU",
        "profile": [
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse|2.7"
        ],
        "tag": [
          {
            "code": "lformsVersion: 30.0.0-beta.6"
          }
        ]
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/3080593"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/70494",
      "status": "completed",
      "item": [
        {
          "linkId": "1",
          "answer": [
            {
              "valueString": "No",
              "valueBoolean": true
            }
          ],
          "text": "DO YOU SEE YOURSELF AS AN OBESE PERSON?"
        },
        {
          "linkId": "2",
          "answer": [
            {
              "valueString": "No",
              "valueBoolean": true
            }
          ],
          "text": "DO YOU BELIEVE YOUR EATING HABITS ARE THE CAUSE OF YOUR OBESITY CONDITION?"
        }
      ],
      "authored": "2023-06-20T06:48:58.778Z"
    },
    "search": {
      "mode": "match"
    }
  },
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270344/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270344",
      "meta": {
        "versionId": "1",
        "lastUpdated": "2023-01-09T21:40:27.429+00:00",
        "source": "#dXPSIgqZDEwCfPnr"
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/3080593"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/70495",
      "status": "in-progress"
    },
    "search": {
      "mode": "match"
    }
  },
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270345/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270345",
      "meta": {
        "versionId": "2",
        "lastUpdated": "2023-01-18T21:36:38.065+00:00",
        "source": "#2HTSgulTtWH0XciT"
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/3080593"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/70496",
      "status": "in-progress"
    },
    "search": {
      "mode": "match"
    }
  },
  {
    "fullUrl": "http://localhost:3000/api/mock/fhir/QuestionnaireResponse/7270350/get",
    "resource": {
      "resourceType": "QuestionnaireResponse",
      "id": "7270350",
      "meta": {
        "versionId": "1",
        "lastUpdated": "2023-01-09T21:46:02.654+00:00",
        "source": "#9WJLebX8mC5Hnnau"
      },
      "basedOn": [
        {
          "reference": "ServiceRequest/7167589"
        }
      ],
      "subject": {
        "reference": "Patient/113798"
      },
      "questionnaire": "Questionnaire/70497",
      "status": "in-progress"
    },
    "search": {
      "mode": "match"
    }
  }
];
export default questionnaireResponses;
