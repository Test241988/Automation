const { ClientFunction } = require('testcafe');

exports.getURL={

    url:  async function(){
        const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
        const uri = await getLocation();
        return uri;

    }
}

