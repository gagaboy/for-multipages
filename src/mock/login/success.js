/**
 * Created by appian on 2016/10/31.
 */

/*
 *    status的状态判断
 *   【0：有参与资格&未报到入学用户&非调期卡期数的学员&调期卡未使用】
 *   【1：已报名但未报名成功】
 *   【2：未报名】
 *   【3：已完成报到学员（已开学或等待开学）】
 *   【4：调期卡期数的学员】
 *   【5：已使用】
 *   【6：有效期<当前时间】
 *   【7：使用者自己使用的完成报道】
 *   【8：我本应该送人却进入了】
 *   【9：使用者使用后,未完成报道】
 *   【10：使用者报道中,未完成报道】
 * */


var $data = {
	title : "已入学",
	desc : "(3/3) 完成入学",
	info : "这是一个新的开始"
};