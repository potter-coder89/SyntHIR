package no.uit.syntHIR.dataWrangling.util;

public class BasicConstants {

	//public static final String AZURE_ACTIVE_DIRECTORY_ACCESS_TOKEN= "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2hkbHN5bnRoZXRpY2RhdGEuYXp1cmVoZWFsdGhjYXJlYXBpcy5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zNTAxZjdkNC03NGZjLTQ1OGYtOTljOC00MTA0MjY2ZmJiNDYvIiwiaWF0IjoxNjc3ODYyMzYxLCJuYmYiOjE2Nzc4NjIzNjEsImV4cCI6MTY3Nzg2NjI2MSwiYWlvIjoiRTJaZ1lHajc0NTkwMG4yVmJMdmZvWlNXdis4akFRPT0iLCJhcHBpZCI6IjRkMzhlNWI2LThjMDItNDg0Mi04MTg0LTMyMTJmY2I4MzNhYSIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzM1MDFmN2Q0LTc0ZmMtNDU4Zi05OWM4LTQxMDQyNjZmYmI0Ni8iLCJvaWQiOiJlOTQ0MzU2NS03NWFmLTQ2ZWUtOGM1Yi04M2MyMjdiMTVjMjMiLCJyaCI6IjAuQVU0QTFQY0JOZngwajBXWnlFRUVKbS03UnRoNFowX3ZXdHhEb2Ytd2MzSkxsSlZPQUFBLiIsInN1YiI6ImU5NDQzNTY1LTc1YWYtNDZlZS04YzViLTgzYzIyN2IxNWMyMyIsInRpZCI6IjM1MDFmN2Q0LTc0ZmMtNDU4Zi05OWM4LTQxMDQyNjZmYmI0NiIsInV0aSI6IlBvaEtYZGZ3VkVxdjQ1VDM0VVlWQUEiLCJ2ZXIiOiIxLjAifQ.M8niomka1tDQKuaZgz85o1P_-FJgEpno4EAqUWFSUbLv674g66WvvWiovOCsu_tt54vhAV3FFf_BARIv5El94xmvsI9lzLujtXhjbwNFn8dyCRalGSbNyjFbWMTrJfwgQG7oSkxm_DY2p3hufADEM-MbYGLHxjeNzio3bosbbwu-2YaAo8Szmk92idp788k6G09bXweNQ2pt5XreIIGTapSyXs3hC9lWWd3iWgwM_gJ7yPQMFmepeLOETsKg1wPOIQcO-b7e_TcKjqMonU0h2MrqacK-r27-1wheMxgs6E0vdpUJ99UcsWkvJ9GqM7oXd5xEo1tE8NTgVp1fSwnsrg";
	public static final String FHIR_RESOURCES_TEMPLATE_LOCATION = "src/main/resources/FHIRResources/request-templates";
	//public static final String FHIR_RESOURCES_TEMPLATE_LOCATION_CONFIG_KEY_NAME = "fhir.resources.template.location"; 
	
	
	public static final String REGISTRY_DATA_DIRECTORY = "src/main/resources/RegistryData/";
	
	//Synthetic data generator credentials (Move them to a file)
	public static final String GRETEL_CLOUD_PRIVATE_KEY = "src/main/resources/pchuit@presc_server";
	public static final String GRETEL_CLOUD_PASSWORD = "prescnorway@2021";
	public static final String GRETEL_CLOUD_USER_NAME = "pch026";
	public static final String GRETEL_CLOUD_HOST_NAME = "deep2.cs.uit.no";
	
	//Synthetic Data Generator API related constants 
	
	public static final String GRETEL_CLI_CREATE_MODEL = "gretel models create ";
	public static final String GRETEL_CLI_CREATE_MODEL_CONFIG_FILE_PATH = "--config ";
	public static final String GRETEL_CLI_CREATE_MODEL_NAME = "--name ";
	public static final String GRETEL_CLI_CREATE_MODEL_OUTPUT_DIRECTORY = "--output ";
	public static final String GRETEL_CLI_CREATE_MODEL_INPUT_DIRECTORY = "--in-data ";
	public static final String GRETEL_CLI_CREATE_MODEL_PROJECT_NAME = "--project ";
	public static final String GRETEL_CLI_GENERATE_SYNTHETIC_RECORDS = " gretel models run ";
	public static final String GRETEL_CLI_GENERATE_SYNTHETIC_RECORDS_MODEL_ID = "--model-id ";
	public static final String GRETEL_CLI_GENERATE_SYNTHETIC_RECORDS_MODEL_PATH = "--model-path ";
	public static final String GRETEL_CLI_GENERATE_SYNTHETIC_RECORDS_PARAM_NUMBER_OF_RECORDS = "--param num_records ";
	public static final String GRETEL_CLI_GENERATE_SYNTHETIC_RECORDS_OUTPUT_DIRECTORY = "--output ";
	public static final String GRETEL_MODEL_CONFIG_FILE_PATH = "~/.gretel/config-tabular-lstm-registry.yml";
	public static final String GRETEL_PROJECT_NAME = "nor-registry-synthetic-data";
	public static final String GRETEL_SYNTHETIC_DATA_OUTPUT_DIRECTORY_PATH = "/home/pch026/synthetic-registry-data/";
	
	
	//Azure storage
	public static final String AZURE_STORAGE_BLOB_CONTAINER_HEALTH_DATA_FILES_NAME = "synthir-health-data-files";
		
}
