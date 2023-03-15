from deephaven import time_table
remote_table = time_table("00:00:01").update_view(["I=i", "J=I*I", "K=I%100"]).last_by(by = ["K"])