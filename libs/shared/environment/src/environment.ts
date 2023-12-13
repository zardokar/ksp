// -----------------------------------------------------------------------------
const DOMAIN_PROD_OCN      = 'https://ksp-ocnapi.ksp.or.th';
const DOMAIN_PROD_SELF_API = 'https://ksp-api.ksp.or.th';
const DOMAIN_PROD_SELF     = 'https://ksp-self.ksp.or.th';

// -----------------------------------------------------------------------------
const DOMAIN_DEV_OCN       = 'https://kspapi.oceanicnetwork.net';
const DOMAIN_DEV_ZDK       = 'https://ksp-api.zdklabs.io';
const DOMAIN_DEV_SELF_API  = 'https://ksp-api.zdklabs.io';

// -----------------------------------------------------------------------------
const CURRENT_DOMAIN       = DOMAIN_PROD_OCN
const CURRENT_SELF_DOMAIN  = DOMAIN_PROD_SELF
const CURRENT_SELF_API     = DOMAIN_DEV_SELF_API
const CURRENT_FILE_URL     = `${DOMAIN_DEV_SELF_API}/app/files`
// -----------------------------------------------------------------------------
const SELF_PUB_AUTH        = `Basic ${btoa('ksppublicapi:KspPublicApi@2023')}`
// -----------------------------------------------------------------------------

//const domain = 'https://ksp-school.ksp.or.th';
//const domain = 'https://ksp-eservice.ksp.or.th';
//const domain = 'https://ksp-selfservice.ksp.or.th';
//const domain = 'https://ksp-uniservice.ksp.or.th'

export const environment = {
      production : false,
     shortApiUrl : CURRENT_DOMAIN + '/kspapi',
          apiUrl : CURRENT_DOMAIN + '/ksp',
      selfAPIURL : CURRENT_SELF_API,
         fileUrl : CURRENT_FILE_URL,
        selfauth : SELF_PUB_AUTH
};
