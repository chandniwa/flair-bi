import angular from 'angular';

'use strict';

angular
    .module('flairbiApp')
    .factory('GenerateTable', GenerateTable);

GenerateTable.$inject = ['VisualizationUtils', '$rootScope', 'D3Utils'];

function GenerateTable(VisualizationUtils, $rootScope, D3Utils) {
    return {
        build: function (record, element, panel) {

            function getProperties(VisualizationUtils, record) {
                var result = {};

                var features = VisualizationUtils.getDimensionsAndMeasures(record.fields),
                    dimensions = features.dimensions,
                    measures = features.measures;

                result['dimension'] = D3Utils.getNames(dimensions);
                result['measure'] = D3Utils.getNames(measures);

                result['maxDim'] = dimensions.length;
                result['maxMes'] = measures.length;

                result["displayNameForDimension"] = [];
                result["cellColorForDimension"] = [];
                result["fontStyleForDimension"] = [];
                result["fontWeightForDimension"] = [];
                result["fontSizeForDimension"] = [];
                result["textColorForDimension"] = [];
                result["textColorExpressionForDimension"] = [];
                result["textAlignmentForDimension"] = [];

                result["displayNameForMeasure"] = [];
                result["cellColorForMeasure"] = [];
                result["cellColorExpressionForMeasure"] = [];
                result["fontStyleForMeasure"] = [];
                result["fontSizeForMeasure"] = [];
                result["fontWeightForMeasure"] = [];
                result["numberFormatForMeasure"] = [];
                result["textColorForMeasure"] = [];
                result["textAlignmentForMeasure"] = [];
                result["textColorExpressionForMeasure"] = [];
                result["iconNameForMeasure"] = [];
                result["iconFontWeight"] = [];
                result["iconColor"] = [];
                result["iconPositionForMeasure"] = [];
                result["iconExpressionForMeasure"] = [];

                for (var i = 0; i < result.maxDim; i++) {
                    result['displayNameForDimension'].push(
                        VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Display name') ||
                        result['dimension'][i]
                    );
                    result['cellColorForDimension'].push(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Cell colour'));
                    result['fontStyleForDimension'].push(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Font style'));
                    result['fontWeightForDimension'].push(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Font weight'));
                    result['fontSizeForDimension'].push(parseInt(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Font size')));
                    result['textColorForDimension'].push(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Text colour'));
                    result['textColorExpressionForDimension'].push(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Text colour expression'));
                    result['textAlignmentForDimension'].push(VisualizationUtils.getFieldPropertyValue(dimensions[i], 'Alignment'));
                }

                for (var i = 0; i < result.maxMes; i++) {
                    result['displayNameForMeasure'].push(
                        VisualizationUtils.getFieldPropertyValue(measures[i], 'Display name') ||
                        result['measure'][i]
                    );
                    result['cellColorForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Cell colour'));
                    result['cellColorExpressionForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Cell colour expression'));
                    result['fontStyleForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Font style'));
                    result['fontWeightForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Font weight'));
                    result['fontSizeForMeasure'].push(parseInt(VisualizationUtils.getFieldPropertyValue(measures[i], 'Font size')));
                    result['numberFormatForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Number format'));
                    result['textColorForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Text colour'));
                    result['textAlignmentForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Text alignment').toLowerCase());
                    result['textColorExpressionForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Text colour expression'));
                    result['iconNameForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Icon name'));
                    result['iconPositionForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Icon position'));
                    result['iconExpressionForMeasure'].push(VisualizationUtils.getFieldPropertyValue(measures[i], 'Icon Expression'));
                }

                return result;
            }

            d3.select(element[0]).html('')
            var div = d3.select(element[0]).append('div')
                .attr('id', 'table-' + element[0].id)
                .attr('width', element[0].clientWidth)
                .attr('height', element[0].clientHeight)
                .style('overflow', 'hidden')
                .style('text-align', 'center')
                .style('position', 'relative');

            var table = flairVisualizations.table()
                .config(getProperties(VisualizationUtils, record))
                .print(false);

            div.datum(record.data)
                .call(table);
        }
    }
}