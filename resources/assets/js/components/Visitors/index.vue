<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <create-data v-if="state_view.state_view"></create-data>
                <edit-data v-if="isEdit.isToggle"></edit-data>
                <data-tables :data="getData" :actions-def="actionsDef" :checkbox-filter-def="checkFilterDef"
                             :action-col-def="actionColDef">
                    <el-table-column v-for="title in titles" :key="title.label" :prop="title.prop" :label="title.label"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetch, data, isEdit, isToggle, setEditData} from './state'
    import {change_view, state_view} from './state_view'
    export default {

        data() {
            var vm = this
            return {
                isEdit: isEdit,
                data: data,
                state_view: state_view,
                titles: [{
                    prop: "category",
                    label: "Categorize"
                }, {
                    prop: "name",
                    label: "Name"
                }, {
                    prop: "year",
                    label: "Level"
                }],
                actionsDef: {
                    colProps: {
                        span: 5
                    },

                    def: [{

                        name: "new",
                        handler: function handler() {
                            change_view()
                        },
                        buttonProps: {
                            type: "text"
                        }
                    }, {
                        name: "import",
                        handler: function handler() {
                            console.log('import')
                        },
                        icon: "upload"
                    }]
                },
                checkFilterDef: {
                    props: 'category',
                    def: [{
                        code: "teacher",
                        name: "Teacher"
                    }, {
                        code: "senior high",
                        name: "Senior High"
                    }, {
                        code: "outsider",
                        name: "Outsider"
                    }, {
                        code: "mkd student",
                        name: "Mkd Student"
                    }]
                },
                actionColDef: {
                    label: "Actions",
                    def: [{
                        handler: function handler(row) {
                            setEditData(row)
                            isToggle()
                        },
                        name: "Edit"
                    }, {
                        icon: "message",
                        type: "text",
                        handler: function handler(row) {
                            console.log('RUA' + row)
                            console.log("RUA in row clicked", row);
                        },
                        name: "RUA"
                    }]
                }
            }
        },
        mounted() {
            fetch('/api/visitors')

        },
        computed: {
            getData(){
                return _.map(this.data.data, function (num) {
                    var pick = _.pick(num, 'id', 'name', 'category', 'year', 'category_id')
                    var object = {
                        id: pick.id,
                        name: pick.name,
                        year: pick.year,
                        category: pick.category ? pick.category.name : '',
                    }
                    return object
                })
            }
        },
        methods: {
            getRowActionsDef() {
                let self = this
                return [{
                    type: 'primary',
                    handler(row) {
                        console.log('Edit clicked')
                        console.log('Edit in row clicked', row)
                    },
                    name: 'Edit'
                }]
            }
        }
    }
</script>
