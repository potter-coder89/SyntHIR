package no.uit.syntHIR.dataWrangling.util;

public class APIConstants {
	
	//Azure Active Directory details
	//Tenant ID of HDL in Azure Active Directory
	public static final String AZURE_ACTIVE_DIRECTORY_TENANT_ID = "3501f7d4-74fc-458f-99c8-4104266fbb46";
	
	//private static final String AZURE_FHIR_OAUTH_URL = "https://login.microsoftonline.com/{{tenantid}}/oauth2/token";
	public static final String AZURE_FHIR_OAUTH_URL = "https://login.microsoftonline.com/3501f7d4-74fc-458f-99c8-4104266fbb46/oauth2/token";
	public static final String AZURE_ACTIVE_DIRECTORY_OAUTH_BASE_URL  = "https://login.microsoftonline.com";
	public static final String AZURE_ACTIVE_DIRECTORY_OAUTH_URL_PARAMS = "oauth2/token";	
	public static final String AZURE_FHIR_GRANT_TYPE_CLIENT_CREDENTIALS = "Client_Credentials";

	//Microsoft FHIR server details
	//fhirurl - The FHIR service full URL. For example, https://xxx.azurehealthcareapis.com. It's located from the FHIR service overview menu option.
	public static final String AZURE_SYNTHIR_FHIR_SERVER_BASE_URL = "https://synthir-server.azurehealthcareapis.com";

	//Application (Client) ID of the application registered on the AAD for accessing Azure API for FHIR
	public static final String AZURE_SYNTHIR_FHIR_SERVER_CLIENT_ID = "31df8912-291f-4d19-881e-9c84189b6676";
	
	//Application Client Secret value (Not the ID) get it from Certificates & secret when application is created
	public static final String AZURE_SYNTHIR_FHIR_SERVER_CLIENT_SECRET = "Uit8Q~qdtjc3o9qpmhgASEyKNr0GV7h~jTj3caqp";
	public static final String AZURE_SYNTHIR_FHIR_SERVER_ACCESS_TOKEN_KEY_NAME = "synthir.fhir.server.access.token";
	
	//fhirurl - The FHIR service full URL. For example, https://xxx.azurehealthcareapis.com. It's located from the FHIR service overview menu option.
	public static final String AZURE_PRIVATE_FHIR_SERVER_BASE_URL = "https://hdlsyntheticdata.azurehealthcareapis.com";	
	public static final String AZURE_PRIVATE_FHIR_SERVER_CLIENT_ID = "4d38e5b6-8c02-4842-8184-3212fcb833aa";
	public static final String AZURE_PRIVATE_FHIR_SERVER_CLIENT_SECRET = "uMt8Q~-AcXt01BZWSNlTwqFom3u1aH6kLvjxQcOT";
	public static final String AZURE_PRIVATE_FHIR_SERVER_ACCESS_TOKEN_KEY_NAME = "private.fhir.server.access.token";
	
	//FHIR resource names
	public static final String FHIR_RESOURCE_PATIENT = "Patient";
	public static final String FHIR_RESOURCE_PRACTITIONER = "Practitioner";
	public static final String FHIR_RESOURCE_LOCATION = "Location";
	public static final String FHIR_RESOURCE_CONDITION = "Condition";
	public static final String FHIR_RESOURCE_ENCOUNTER = "Encounter";
	public static final String FHIR_RESOURCE_MEDICATION = "Medication";
	public static final String FHIR_RESOURCE_MEDICATION_REQUEST = "MedicationRequest";	
	public static final String FHIR_RESOURCE_MEDICATION_DISPENSE = "MedicationDispense";		
	public static final String FHIR_RESOURCE_CLAIM = "Claim";
	
	//Application configuration keys
	
	public static final String APPLICATION_CONFIG_KEY_NAME_AZURE_ACTIVE_DIRECTORY_TENANT_ID = "azure.active.directory.tenant.id";
	public static final String APPLICATION_CONFIG_KEY_NAME_AZURE_ACTIVE_DIRECTORY_OAUTH_URL = "azure.active.directory.oauth.url";
	
	public static final String APPLICATION_CONFIG_KEY_NAME_PRIVATE_FHIR_SERVER_BASE_URL = "hdl.fhir.server.base.url";
	public static final String APPLICATION_CONFIG_KEY_NAME_PRIVATE_FHIR_SERVER_CLIENT_ID = "hdl.azure.app.client.reg.id";
	public static final String APPLICATION_CONFIG_KEY_NAME_PRIVATE_FHIR_SERVER_CLIENT_SECRET = "hdl.azure.app.client.reg.secret";
	
	public static final String APPLICATION_CONFIG_KEY_NAME_SYNTHIR_FHIR_SERVER_BASE_URL = "synthir.fhir.server.base.url";
	public static final String APPLICATION_CONFIG_KEY_NAME_SYNTHIR_FHIR_SERVER_CLIENT_ID = "synthir.fhir.app.client.reg.id";
	public static final String APPLICATION_CONFIG_KEY_NAME_SYNTHIR_FHIR_SERVER_CLIENT_SECRET = "synthir.fhir.app.client.reg.secret";
	

	//Misc
	public static final String REQUEST_SEPARATOR = "/";
	public static final String SPACE_SEPERATOR = " ";
	
	
	
}
