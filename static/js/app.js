const data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const jsonData = {};
const metadataJson = {};

d3.json(data).then(function(data) {

    data.samples.forEach(element => {
        jsonData[element.id] = element;
    });

    data.metadata.forEach(element => {
        metadataJson[element.id] = element;
    });

    var select = document.getElementById("selDataset");
    var options = data.names;

    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
    
    CP(jsonData[options[0]]);
    CB(jsonData[options[0]]);
    DI(metadataJson[options[0]]);
    CG(metadataJson[options[0]]);

});

function OpCh(value) {
    console.log(value)
    const sampleData = jsonData[value];
    const metadata = metadataJson[value];
    CP(sampleData);
    CB(sampleData);
    DI(metadata);
    CG(metadata);
}

function CP(sampleData) {
    slicedValues = sampleData.sample_values.slice(0, 10);
    slicedIds = sampleData.otu_ids.slice(0, 10);
    slicedLabels = sampleData.otu_labels.slice(0, 10);

    reversedValues = slicedValues.reverse();
    reversedIds = slicedIds.reverse();
    reversedLabels = slicedLabels.reverse();
    
    reversedIds = reversedIds.map((value) => 'OTU ' + value);
    
    let trace1 = {
        x: reversedValues,
        y: reversedIds,
        text: reversedLabels,
        name: "OTU",
        type: "bar",
        orientation: "h"
    };

    let traceData = [trace1];

    let layout = {
        margin: {
        l: 100,
        r: 100,
        t: 0,
        b: 100
        }
    };

    Plotly.newPlot("plot", traceData, layout);
}

function CB(sampleData) {
    var trace1 = {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: 'markers',
        marker: {
            color: sampleData.otu_ids,
            size: sampleData.sample_values
        },
    }

    let traceData = [trace1];

    var layout = {
        showlegend: false,
        xaxis: {
            title: "OTU ID"
        }
      };
      
      Plotly.newPlot("bubble", traceData, layout);
}

function DI(metadata) {
    var sampleMetadata = document.getElementById("sample-metadata");
    sampleMetadata.innerHTML = '';

    Object.keys(metadata).forEach(key => {
        var content = document.createElement("p");
        content.textContent =`${key}: ${metadata[key]}`;
        sampleMetadata.appendChild(content);
    });
}

function CG(metadata) {
    var trace1 = {
        domain: { 
            x: [0, 1], 
            y: [0, 1] 
        },
        value: metadata.wfreq,
        title: { 
            text: "Belly Button Washing Freq" 
        },
        type: "Indicator",
        mode: "Gauge",
        gauge: {
            axis: { 
                range: [0, 9]
            }
        }
    };

    let traceData = [trace1];

    var layout = {
        margin: { 
            t: 0, 
            b: 100 
        },
      };
      
      
      Plotly.newPlot("gauge", traceData, layout);
}