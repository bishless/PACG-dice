angular.module("App", [])
	.controller("Controller", ["$scope", function($s) {
		$s.d_results = [];
		$s.d_all = function() {
			var push_if_positive = function(list, n, dname) {
				if (n) {
					list.push(n + dname);
				}
			};
			var d_list = [];
			push_if_positive(d_list, $s.d4, "d4");
			push_if_positive(d_list, $s.d6, "d6");
			push_if_positive(d_list, $s.d8, "d8");
			push_if_positive(d_list, $s.d10, "d10");
			push_if_positive(d_list, $s.d12, "d12");
			push_if_positive(d_list, $s.skillbonus, "");
			if (d_list.length) {
				return d_list.join(" + ");
			} else {
				return "";
			}
		};
		$s.d_roll = function() {
			var roller = function(d) {
				return Math.floor((Math.random() * d) + 1);
			};
			var roll = function(r_list, n, d) {
				for (var i = 0; i < n; ++i) {
					r_list.push(roller(d));
				}
			};
			var r_list = [];
			roll(r_list, $s.d4, 4);
			roll(r_list, $s.d6, 6);
			roll(r_list, $s.d8, 8);
			roll(r_list, $s.d10, 10);
			roll(r_list, $s.d12, 12);
			var r_total = 0;
			for (var i = 0; i < r_list.length; ++i) {
				r_total += r_list[i];
			}

			if ($s.skillbonus != null) {
				var r_bonus = $s.skillbonus;
				console.log("modifier = " + r_bonus);
				r_total += r_bonus;
			}

			$s.d_results.unshift({
				dice: $s.d_all(),
				all: r_list,
				total: r_total
			});
			// Reset dice counts
			$s.d4 = '';
			$s.d6 = '';
			$s.d8 = '';
			$s.d10 = '';
			$s.d12 = '';
			$s.skillbonus = '';
		};
	}]);
