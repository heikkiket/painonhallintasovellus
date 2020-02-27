// This code is originally written by Krasimir Tsonev:
https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
// I copied it here and swear, wrote every line through and tested by myself how it works.
// Don't just copy-paste, learn how things are done ;)

applyTemplate = function(tmpl, data) {
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var re=/<%([^%>]+)?%>/g;
    cursor = 0;

    var code = "var r=[];\n";
    var add = function(str, js)  {
        if(js) {
            //If code has keyword, push straight away
            code += str.match(reExp) ? str : 'r.push(' + str + ');\n';
        } else {
            code = code + 'r.push("'
                + str.replace(/"/, "\"") +'");\n';
        }
    };

    while(match = re.exec(tmpl)) {
        add(tmpl.slice(cursor, match.index));
        add(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tmpl.slice(cursor));
    code += 'return r.join("")';
    return new Function(code).apply(data);
};
