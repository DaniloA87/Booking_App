sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.roomBooking.controller.Page1", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5c5c011ceea38970f4a5c330";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		formatDateTimeUTCtoLocale: function(utcDate) {
			return utcDate ? new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate(), utcDate.getUTCHours(), utcDate.getUTCMinutes(), utcDate.getUTCSeconds()) : null;

		},
		formatDateTimeUTCtoLocaleForStartDate: function(utcDate) {
			return utcDate ? new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate(), utcDate.getUTCHours(), utcDate.getUTCMinutes(), utcDate.getUTCSeconds()) : new Date(864000000000000);

		},
		applyFiltersAndSorters: function(sControlId, sAggregationName, chartBindingInfo) {
			if (chartBindingInfo) {
				var oBindingInfo = chartBindingInfo;
			} else {
				var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			}
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function(sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var aGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby || oBindingData.groupby === null) {
					aGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = aGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (aGroupby) {
				aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			var oView = this.getView(),
				oData = {},
				self = this;
		    var oCal = oView.byId("idCal");
		    oCal.setStartDate(new Date());       
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");
			self.oBindingParameters = {};

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132"] = {};

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132"]["startDate"] = new Date("2018-07-01T07:00:00.000Z");

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-1"] = {};

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-1"]["startDate"] = new Date("2018-07-01T08:30:00.000Z");

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-1"]["endDate"] = new Date("2018-07-01T10:30:00.000Z");

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-2"] = {};

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-2"]["startDate"] = new Date("2018-07-01T07:00:00.000Z");

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-2"]["endDate"] = new Date("2018-07-01T09:30:00.000Z");

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-3"] = {};

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-3"]["startDate"] = new Date("2018-07-01T11:00:00.000Z");

			oData["sap_Responsive_Page_0-content-sap_m_PlanningCalendar-1549533620132-rows-sap_m_PlanningCalendarRow-1-appointments-sap_ui_unified_CalendarAppointment-3"]["endDate"] = new Date("2018-07-01T13:30:00.000Z");

			oView.getModel("staticDataModel").setData(oData, true);

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}
			var that = this;
			var oButton = new sap.m.Button('Save', {

                    text: 'Salva',

                   tap: [ that.onSave, that ]

             });

             var oButton1 = new sap.m.Button('Cancel', {

                    text: 'Cancella',

                    tap: [ that.onCancel, that ]

             });
			var oDialog = new sap.m.Dialog('Dialog',{

                    title:'Prenota',

                    modal: true,

                    contentWidth:'2em',

                    buttons: [ oButton, oButton1 ],

             content:[

                      new sap.m.Label({text:'Nome'}),

                      new sap.m.Input({

                    maxLength: 20,

                    id: 'idName'

                      }),

                      new sap.m.Label({text:'Motivo'}),

                      new sap.m.Input({

                   maxLength: 20,

                     id: 'idTitle'

                       }),
                        new sap.m.Label({text:'Dettagli'}),

                      new sap.m.Input({

                   maxLength:50,

                     id: 'idInfo'

                       }),

                      new sap.m.Label({text:'Orario di partenza'}),

                      new sap.m.DateTimePicker({

                  

                   id: 'idStart' 

                    }),
                     new sap.m.Label({text:'Orario di fine'}),

                      new sap.m.DateTimePicker({

                  

                   id: 'idEnd' 

                    })
                    

                      ]

             });

		},
		onAfterRendering: function() {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

		},
			onSave: function(oEvent) {
		     var that = this;
		     var Name = sap.ui.getCore().byId('idName').getValue();

             var Title = sap.ui.getCore().byId('idTitle').getValue();

             var Start = sap.ui.getCore().byId('idStart').getDateValue();
             
             var End = sap.ui.getCore().byId('idEnd').getDateValue();
             
             var Info = sap.ui.getCore().byId('idInfo').getValue();
             
             var oEntry = {};
             oEntry.name = Name;
             oEntry.start = Start;
             oEntry.end = End;
             oEntry.info = Info;
             
             var oModel = this.getView().getModel();
             oModel.create('/BookingsSet',oEntry,{success:this.onCreateOk()});
			},
	onCreateOk: function(oEvent) {
   	var msg = 'Registrazione effettuata';
   	var oDialog = sap.ui.getCore().byId('Dialog');
   	oDialog.close();
   	sap.m.MessageBox.show(msg);
   	
   },
   onCancel: function(oEvent) {  
		
		sap.ui.getCore().byId('Dialog').close();
	},
			onAdd: function(oEvent) {
			var that = this;

             sap.ui.getCore().byId('Dialog').open();
		},
	});
}, /* bExport= */ true);
