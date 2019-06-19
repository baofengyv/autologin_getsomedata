
const cheerio = require('cheerio');

const processData = {};

processData.getNameIds = function (r) {
    var nameAndReportIdS = [];

    r.data.forEach(x => {
        nameAndReportIdS.push({
            name: x.PatientName,
            reportId: x.CRFDataID
        });
    });

    return nameAndReportIdS;
};

processData.parseHTMLInfo = function (nameReport) {
    var r = [];
    nameReport.forEach(x => {
        r.push({
            name: x.name,
            info: parseHTMLGetInfo(x.html)
        });
    });

    return r;
};

processData.printTable = function (data) {
    data.forEach(p => {
        p.info.forEach(info => {
            console.log(
                p.name+'\t|',
                info[0]+'\t\t|',
                info[1]+'\t|',
                info[2]
            );
        });
    });

};

function parseHTMLGetInfo(data) {

    const $ = cheerio.load(data);

    var r = [];

    $('ul[title=项目名称]').parent().find('ul').each((_, ul) => {
        $(ul).find("li").each((i, li) => {

            var text = $(li).text();
            if (!r[i]) {
                r[i] = [text];
                return;
            }

            r[i].push(text);
        });
    });

    return r;
};

module.exports = processData;