
export default class Table {
    constructor(table) {
        this.table = table;
        this.groups = $(this.table).find(`div[data-group]`);
        this.targetGroup = null;
    }
    getGroup(groupId) {
        return $(this.table).find(`div[data-group=${groupId}]`);
    }
    selectGroup(groupId) {
        for (let i = 0; i < groupId.length; i++) {
            this.targetGroup = this.getGroup(groupId[i]);
            this.targetGroup.toggleClass('active');
        }
    }
}